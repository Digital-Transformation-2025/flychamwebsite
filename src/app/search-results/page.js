import { fetchFromAPI } from "@/lib/api";
import FlightResultsClient from "./FlightResultsClient";
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


