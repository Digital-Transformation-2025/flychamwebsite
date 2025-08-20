import AboutClient from './AboutClient';
export const metadata = {
    title: "About Us - FlyCham",
    description: "Discover the story behind FlyCham mission, values, and commitment to delivering a comfortable, safe, and reliable flying experience to destinations across the region.",
    icons: {
        icon: '/tabicon.svg',
    },
    openGraph: {
        title: 'About Us - FlyCham',
    description: "Discover the story behind FlyCham mission, values, and commitment to delivering a comfortable, safe, and reliable flying experience to destinations across the region.",
    images: [
      {
        url: 'https://flycham.com/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Fly Cham OG Cover',
      },
    ],
    },
};
const about = () => {
    return (
        <AboutClient />
    );
};

export default about;
