const getFlightCurrencyAndRegion = (flights, IndirectAirPort) => {
    const commonInfo = flights?.[0]?.common_info || IndirectAirPort?.[0]?.common_info || {};

    const currency = commonInfo?.currency || '';
    const region = commonInfo?.region?.split(' ')[0] || '';

    return { currency, region };
};
export default getFlightCurrencyAndRegion