# Project Technical Stack & Architecture

This project is a modern re-implementation of a legacy PHP, HTML, and Bootstrap website into a **Next.js (App Router)** and **Tailwind CSS** application. It serves as a single-page marketing website for handyman services, complete with a secure, server-side Telegram lead submission form.

---

## 🛠️ Technology Stack

| Category | Technology / Library | Version / Details |
| :--- | :--- | :--- |
| **Languages** | TypeScript, HTML5, CSS3, JavaScript (ES6+) | Type-safe environment |
| **Framework** | [Next.js](https://nextjs.org/) (App Router) | `v16.2.6` (React 19) |
| **Styling (Tailwind)** | [Tailwind CSS](https://tailwindcss.com/) | `v4` (using `@tailwindcss/postcss`) |
| **Icon Libraries** | FontAwesome 6, Unicons | Local files inside `public/assets` |
| **Lead Delivery** | Telegram Bot API | Server-side integration |
| **Runtime Env** | Node.js | v20+ recommended |

---

## 📂 Project Architecture

```text
├── .env.local             # Private environment variables (Git-ignored)
├── .gitignore             # Git exclusion rules (ignores /old/, node_modules, etc.)
├── AGENTS.md              # AI Agent rules for Next.js 16
├── package.json           # Node project configuration and script run directives
├── postcss.config.mjs     # PostCSS configuration for Tailwind CSS v4
├── tailwind.config.ts     # Tailwind CSS theme customization overrides
├── tsconfig.json          # TypeScript compiler preferences
│
├── old/                   # Legacy PHP, HTML, and Bootstrap site files (Git-ignored)
│
├── public/
│   └── assets/            # Static assets migrated from the legacy project
│       ├── css/           # Swiper, FontAwesome, Unicons, and main style.css
│       ├── fonts/         # Woff/Woff2/TTF files for Iconsets
│       └── images/        # Site graphics (logos, banners, about section)
│
└── src/
    └── app/
        ├── api/
        │   └── contact/
        │       └── route.ts  # Lead submission handler (Telegram bot bridge)
        ├── globals.css    # Global Tailwind v4 styles and overrides
        ├── layout.tsx     # Root Layout, GTag scripts, and css plugins import
        └── page.tsx       # Main Page component (Interactive elements & UI)
```

---

## ⚙️ Key Implementations

### 1. Legacy Style Integration & Specificity Override
- **Stylesheets:** The legacy theme stylesheets (`public/assets/css/style.css`, FontAwesome, Unicons, etc.) are imported inside the `<head>` of [layout.tsx](file:///c:/Users/posik/OneDrive/Рабочий стол/My Bad Dreams/Projects/Mevova/src/app/layout.tsx) to ensure pixel-perfect fidelity with the original site design.
- **Tailwind Utility Conflict:** The legacy `style.css` contains default styles for `button` and other tags. To prevent specificity conflicts where legacy rules override Tailwind utilities, critical UI elements (e.g., action buttons inside modal overlays in [page.tsx](file:///c:/Users/posik/OneDrive/Рабочий стол/My Bad Dreams/Projects/Mevova/src/app/page.tsx)) use **explicit inline styles** (`style={{ backgroundColor: '...', color: '...' }}`).

### 2. Client-Side Interactions (React State)
All legacy jQuery and Bootstrap script interactions have been fully replaced with native React hooks (`useState`, `useEffect`) inside the `'use client'` module [page.tsx](file:///c:/Users/posik/OneDrive/Рабочий стол/My Bad Dreams/Projects/Mevova/src/app/page.tsx):
- **Sticky Header:** Toggle classes depending on `window.scrollY > 150`.
- **Return to Top Widget:** An SVG circle showing page scroll percentage progress. Clicking smooth-scrolls to the top.
- **Drawer Sidebar Menu:** Collapsible mobile menu overlays.
- **Lead Submission Status Modals:** Full UI states for `loading`, `success`, and `error` forms.

### 3. Lead Submission API Route Handler
- The contact form submits data to the [route.ts](file:///c:/Users/posik/OneDrive/Рабочий стол/My Bad Dreams/Projects/Mevova/src/app/api/contact/route.ts) route handler.
- It parses form parameters, validates inputs, and triggers a honeypot check to block bots.
- User input fields are HTML-escaped to prevent breaking Telegram's HTML parser.
- The route fires a server-side POST request to `https://api.telegram.org/bot<TOKEN>/sendMessage`.

---

## 🔒 Environment Configurations

Create a `.env.local` file in the root directory to store credentials securely (never commit this to version control):

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

---

## 🚀 Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Start development server locally |
| `npm run build` | Compile optimized production bundle |
| `npm run start` | Run production-built code |
| `npm run lint` | Run ESLint check |
