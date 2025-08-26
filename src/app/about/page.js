import AboutClient from './AboutClient';
export const metadata = {
    title: "About Us - FlyCham",
    description: "Discover the story behind FlyCham mission, values, and commitment to delivering a comfortable, safe, and reliable flying experience to destinations across the region.",
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
