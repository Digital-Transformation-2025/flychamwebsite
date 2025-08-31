import HomeClient from '@/app/HomeClient';
import { fetchFromAPI } from '@/lib/api';

export const metadata = {
  title: 'Fly Cham - Choose Excellence',
  description:
    'Book flights across the world and discover the story behind Fly Cham, our identity, and our commitment to excellence in aviation.',
  icons: {
    icon: [

      { url: '/favicon.ico?v=1', sizes: '48x48' },
      { url: '/favicon-16x16.png?v=1', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png?v=1', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-48x48.png?v=1', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-64x64?v=1', type: 'image/png', sizes: '64x64' },
      { url: '/favicon-128x128?v=1', type: 'image/png', sizes: '128x128' },
      { url: '/favicon-256x256?v=1', type: 'image/png', sizes: '256x256' },
      { url: '/icon.svg', type: 'image/svg+xml' }, // optional
    ],
    apple: [{ url: '/apple-touch-icon.png?v=1', sizes: '180x180' }],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#0B4572' }],
  },
  openGraph: {
    title: 'Fly Cham - Choose Excellence',
    description:
      'Book flights across the world and discover the story behind Fly Cham, our identity, and our commitment to excellence in aviation.',
    url: 'https://flycham.com',
    siteName: 'Fly Cham',
    images: [
      {
        url: 'https://flycham.com/logo.jpg', // 🔁 Replace with correct image URL (JPG or PNG)
        width: 1200,
        height: 630,
        alt: 'Fly Cham Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fly Cham - Choose Excellence',
    description:
      'Book flights across the world and discover the story behind Fly Cham, our identity, and our commitment to excellence in aviation.',
    images: ['https://flycham.com/logo.jpg'], // 🔁 Same as above
  },
};
// fetch logic: accepts ?search=param
// ✅ Async data fetching function
export async function getAirports() {
  return await fetchFromAPI(`/api/booking/AirPort?filters=language==en&sorts=iata`)
}
export async function getPos() {
  return await fetchFromAPI(`/api/booking/POS`)
}

export default async function DynamicPage({ params }) {
  const flights = await getAirports()
  const pos = await getPos()
  return <HomeClient flights={flights} pos={pos} />;
};

