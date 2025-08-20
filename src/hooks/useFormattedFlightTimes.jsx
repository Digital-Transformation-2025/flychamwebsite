import getTimeDifference from "@/util/getTimeDifference";
import { useSelector } from "react-redux";

// hooks/useFormattedFlightTimes.js
const useFormattedFlightTimes = (flight) => {
    const arrival_time = flight?.common_info?.arrival_time;
    const departure_time = flight?.common_info?.departure_time;

    const originCode = flight?.common_info?.origin_code;
    const destinationCode = flight?.common_info?.destination_code;
    const duration = flight?.common_info?.duration;
    const stops = flight?.common_info?.stops;
    const flightNumber = flight?.common_info?.flight_number;

    const Business = flight?.Business
    const Economy = flight?.Economy
    const common_info = flight?.common_info
    const segments = common_info?.segments;
    const currency = common_info?.currency;
    const flightType = common_info?.flight;




    const departureAirport = Array.isArray(segments) && segments.length > 0
        ? segments[0]?.origin_name
        : '';

    const arrivalAirport = Array.isArray(segments) && segments.length > 0
        ? segments[segments.length - 1]?.destination_name
        : '';

    const {
        transaction_id: ecoID,
        total_fare: ecoFare,
    } = Economy ?? {};

    const {
        transaction_id: busID,
        total_fare: busFare,
    } = Business ?? {};



    const formatTime = (timeStr) => timeStr?.slice(0, 5) || "";

    return {
        arrivalTime: formatTime(arrival_time),
        departureTime: formatTime(departure_time),
        // hours,minutes,
        originCode, destinationCode, duration, stops, flightNumber, ecoID, ecoFare,
        busID, busFare, segments, departureAirport, arrivalAirport, segments,
        currency: currency,flightType
    };
};

export default useFormattedFlightTimes;
