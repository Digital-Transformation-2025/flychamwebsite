const getTimeDifference = (departure_time, arrival_time) => {
    const [depH, depM] = departure_time.split(":").map(Number);
    const [arrH, arrM] = arrival_time.split(":").map(Number);

    // Convert to minutes
    const departureMinutes = depH * 60 + depM;
    const arrivalMinutes = arrH * 60 + arrM;

    const diff = arrivalMinutes - departureMinutes;

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return { hours, minutes };
};
export default getTimeDifference





