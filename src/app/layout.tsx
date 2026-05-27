import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://handytx.com'),
  title: 'Handy&Man | Professional Handyman Services in McKinney & Frisco, TX',
  description: 'Professional handyman services in McKinney, Frisco, Allen, Plano, and DFW. We specialize in home repair, electrical, plumbing, door installation, TV mounting, and furniture assembly. Reliable, punctual, and quality guaranteed!',
  keywords: [
    'Handyman McKinney TX',
    'Handyman Frisco TX',
    'local handyman DFW',
    'home repair McKinney',
    'furniture assembly McKinney',
    'TV mounting Frisco',
    'door installation Collin County',
    'plumbing repairs McKinney',
    'electrical repairs Frisco',
    'home maintenance Texas'
  ],
  icons: {
    icon: '/assets/images/fav.png',
    shortcut: '/assets/images/fav.png',
  },
  alternates: {
    canonical: 'https://handytx.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Handy&Man | Professional Handyman Services in McKinney & Frisco, TX',
    description: 'Looking for a reliable local handyman in Collin County? We offer professional home repair, furniture assembly, TV mounting, plumbing, and electrical services. Satisfaction guaranteed!',
    url: 'https://handytx.com',
    siteName: 'Handy&Man Handyman Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/images/about/17.jpg',
        width: 800,
        height: 600,
        alt: 'Handy&Man Handyman Services McKinney Texas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Handy&Man | Professional Handyman Services in McKinney & Frisco, TX',
    description: 'Reliable local handyman in McKinney, Frisco, DFW. Home repair, assembly, mounting, plumbing, and electrical. Call +1 (469) 452-7454!',
    images: ['/assets/images/about/17.jpg'],
  },
  verification: {
    google: 'G-153HX59QFZ',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-153HX59QFZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-153HX59QFZ');
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5WPSLKPH');
          `}
        </Script>

        {/* External CSS plugins from public directory */}
        <link rel="stylesheet" href="/assets/css/plugins/fontawesome-6.css" />
        <link rel="stylesheet" href="/assets/css/plugins/swiper.css" />
        <link rel="stylesheet" href="/assets/css/plugins/unicons.css" />
        <link rel="stylesheet" href="/assets/css/plugins/metismenu.css" />
        <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css?t=1" />
      </head>
      <body className="index-cleaning-home onepage">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5WPSLKPH"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
