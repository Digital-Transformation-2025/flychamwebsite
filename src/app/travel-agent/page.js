import TravelAgentClient from './TravelAgentClient';

export const metadata = {
  title: 'Travel Agents – Fly Cham',
  description: 'Partner with Fly Cham as a travel agent and unlock opportunities to serve passengers across our routes.',
  icons: {
    icon: '/tabicon.svg',
  },
        openGraph: {
  title: 'Travel Agents – Fly Cham',
  description: 'Partner with Fly Cham as a travel agent and unlock opportunities to serve passengers across our routes.',
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

const TravelAgent = () => {
  return <TravelAgentClient />;
};

export default TravelAgent;
