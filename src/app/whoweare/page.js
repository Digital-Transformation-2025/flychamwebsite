import WhoWeAreClient from './WhoWeAreClient';

export const metadata = {
    title: 'Who We Are – Fly Cham',
    description: 'Discover the story behind Fly Cham, our identity, and our commitment to excellence in aviation.',
    icons: {
        icon: '/tabicon.svg',
    },
            openGraph: {
    title: 'Who We Are – Fly Cham',
    description: 'Discover the story behind Fly Cham, our identity, and our commitment to excellence in aviation.',
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

const Page = () => {
    return <WhoWeAreClient />;
};

export default Page;
