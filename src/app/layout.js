import { Geist, Geist_Mono } from 'next/font/google';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-day-picker/style.css';
import ClientLayoutWrapper from './ClientLayoutWrapper';
import { Toaster } from 'sonner';
import Script from 'next/script';
import Head from 'next/head';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Fly Cham',
  description: 'Fly Cham - Choose Excellence',

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-64x64', type: 'image/png', sizes: '64x64' },
      { url: '/favicon-128x128', type: 'image/png', sizes: '128x128' },
      { url: '/favicon-256x256', type: 'image/png', sizes: '256x256' },
      { url: '/icon.svg', type: 'image/svg+xml' }, // optional
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#0B4572' }],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html dir="ltr">
      <head>
        {/* ✅ Prevent screen zoom on input focus (especially iOS Safari) */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />

        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />




        <style>{`
          body, h1, p, h2, h3, h4, h5, h6, div, span {
            font-family: 'Montserrat', sans-serif !important;
          }
        `}</style>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster richColors />
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
      <Script
        src="https://unpkg.com/preline/dist/preline.js"
        strategy="afterInteractive"
      />
    </html>
  );
}
