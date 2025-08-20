import { Geist, Geist_Mono } from 'next/font/google';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-day-picker/style.css';
import ClientLayoutWrapper from './ClientLayoutWrapper';
import { Toaster } from 'sonner';
import Script from 'next/script';

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
  description: 'fly cham ',
  icons: {
    icon: '/tabicon.svg',
  },
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
