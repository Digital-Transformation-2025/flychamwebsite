import { fetchFromAPI } from "@/lib/api";
import FlightResultsClient from "./FlightResultsClient";
export const metadata = {
    title: 'Fly Cham',
    description: 'Fly Cham - Choose Excellence',

    icons: {
        icon: [
            { url: '/favicon.ico', sizes: '48x48' },
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
export async function getAirports() {
    return await fetchFromAPI(`/api/booking/AirPort?filters=language==en&sorts=iata`)
}
export async function getPos() {
    return await fetchFromAPI(`/api/booking/POS`)
}

export default async function FlightResults() {
    const airPorts = await getAirports()
    const pos = await getPos()



    return (
        <FlightResultsClient pos={pos} airPorts={airPorts}>
        </FlightResultsClient>

    );
};


