import MissionClient from './MissionClient';

export const metadata = {
  title: 'Our Mission – Fly Cham',
  description: 'Learn about Fly Cham’s mission, vision, and core values that guide our journey in aviation.',
  icons: {
    icon: '/tabicon.svg',
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
