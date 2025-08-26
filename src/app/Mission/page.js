import MissionClient from './MissionClient';

export const metadata = {
  title: 'Our Mission – Fly Cham',
  description: 'Learn about Fly Cham’s mission, vision, and core values that guide our journey in aviation.',
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
    title: 'Our Mission – Fly Cham',
    description: 'Learn about Fly Cham’s mission, vision, and core values that guide our journey in aviation.',
    images: [
      {
        url: 'https://flycham.com/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Fly Cham Logo',
      },
    ],
  },
};

const Mission = () => {
  return <MissionClient />;
};

export default Mission;
