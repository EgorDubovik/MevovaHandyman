import { NextResponse } from 'next/server';

const escapeHtml = (text: string) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

export async function POST(request: Request) {
  try {
    // Check if Content-Type is form data or JSON
    const contentType = request.headers.get('content-type') || '';
    let name = '';
    let email = '';
    let phone = '';
    let desc = '';
    let honeypot = '';

    if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      name = (formData.get('name') as string) || '';
      email = (formData.get('email') as string) || '';
      phone = (formData.get('phone') as string) || '';
      desc = (formData.get('desc') as string) || '';
      honeypot = (formData.get('honeypot') as string) || '';
    } else {
      const body = await request.json();
      name = body.name || '';
      email = body.email || '';
      phone = body.phone || '';
      desc = body.desc || '';
      honeypot = body.honeypot || '';
    }

    // 1. Honeypot check
    if (honeypot) {
      return new Response('nea, nea!', { status: 200 });
    }

    // 2. Validation
    name = name.trim();
    email = email.trim();
    phone = phone.trim();
    desc = desc.trim();

    // Simple email validation regex matching PHP FILTER_VALIDATE_EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !desc || !email || !emailRegex.test(email)) {
      return new Response('Invalid data', { status: 400 });
    }

    // 3. Telegram config
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error('Telegram bot credentials are not configured.');
      return new Response('Telegram credentials missing', { status: 500 });
    }

    // 4. Format Message (HTML escaping to prevent breaking Telegram parser)
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(desc);

    let telegramMessage = `<b>New website request</b>\n`;
    telegramMessage += `Name: ${safeName}\n`;
    telegramMessage += `Email: ${safeEmail}\n`;
    telegramMessage += `Phone: ${safePhone}\n`;
    telegramMessage += `Message: ${safeMessage}`;

    // 5. Send to Telegram API
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        parse_mode: 'html',
        text: telegramMessage,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Telegram API response error:', errText);
      return new Response('Failed to send Telegram message', { status: 502 });
    }

    return new Response('Telegram message sent', { status: 200 });
  } catch (error) {
    console.error('Contact API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
