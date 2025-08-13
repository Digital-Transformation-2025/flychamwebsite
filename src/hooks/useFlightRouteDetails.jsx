// hooks/useFlightRouteDetails.js
import formatDateReadble from "@/util/formatDateReadble";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const useFlightRouteDetails = () => {
    const { i18n } = useTranslation();
    const { searchParams, selectedFlight } = useSelector((state) => state.flights);

    // const { commonInfo } = selectedPlan
    const selectedFlightSegments = selectedFlight?.common_info?.segments ?? []
    const firstSeg = selectedFlightSegments[0] || null;
    const lastSeg = selectedFlightSegments.length ? selectedFlightSegments[selectedFlightSegments.length - 1] : null;

    
    const selectedOrigin = firstSeg
        ? {
            iataCode: firstSeg.origin_code ?? "",
            originAirPortName: firstSeg.origin_name ?? "",
            city: firstSeg.origin_city ?? "",
        }
        : null;

    const selectedDestenation = firstSeg
        ? {
            iataCode: (firstSeg.destination_code ?? firstSeg.destination_code) ?? "",
            destenationAirPortName: (firstSeg.destination_name ?? firstSeg.destination_name) ?? "",
            city: (firstSeg.destination_city ?? firstSeg.destination_city) ?? "",
        }
        : null;



    const { origin_id, destination_id, date, date_return, flighttype } = searchParams;

    const airPortsItems = useSelector((state) => state.flights.airPorts?.items) || [];

    const originAirPort = airPortsItems.find((a) => a.id === origin_id);
    const destAirPort = airPortsItems.find((a) => a.id === destination_id);

    const {
        iataCode,
        airPortTranslations: originAirPortTranslations
    } = originAirPort || {};

    const {
        iataCode: destIataCode,
        airPortTranslations: distAirPortTranslations
    } = destAirPort || {};


    const {
        country: destCountry,
        city: destCity,
        airPortName: destAirPortName
    } = distAirPortTranslations?.find(a => a.languageCode === i18n.language) || {};



    const {
        country,
        city,
        airPortName: originAirPortName
    } = originAirPortTranslations?.find(a => a.languageCode === i18n.language) || {};


    return {
        origin: Boolean(selectedOrigin) ? selectedOrigin : {
            id: origin_id,
            iataCode,
            city,
            country,
            originAirPortName: originAirPortName
        },
        destination: Boolean(selectedDestenation) ? selectedDestenation : {
            id: destination_id,
            iataCode: destIataCode,
            city: destCity,
            country: destCountry,
            destenationAirPortName: destAirPortName
        },
        date: formatDateReadble(date),
        dateReturn: formatDateReadble(date_return),
        flighttype

    };
};

export default useFlightRouteDetails;
