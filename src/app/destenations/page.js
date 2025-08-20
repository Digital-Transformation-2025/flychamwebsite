import { fetchFromAPI } from '@/lib/api';
import DestenationClient from './DestenationClient';

export const metadata = {
    title: 'Destinations – Fly Cham',
    description: 'Explore Fly Cham’s flight destinations across the region and beyond.',
    icons: {
        icon: '/tabicon.svg',
    },
    openGraph: {
        title: 'Destinations – Fly Cham',
        description: 'Explore Fly Cham’s flight destinations across the region and beyond.',
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
export async function getAirports() {
    return await fetchFromAPI(`/api/booking/AirPort?filters=language==en&sorts=iata`)
}
export async function getPos() {
    return await fetchFromAPI(`/api/booking/POS`)
}

export default async function DestenationPage() {
    const flights = await getAirports()
    const pos = await getPos()
    return <DestenationClient flights={flights} pos={pos} />;
};

