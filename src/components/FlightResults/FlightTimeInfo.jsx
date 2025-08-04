'use client'
import Image from 'next/image';
import React from 'react'
import planepath from '@/assets/images/planepath.png';
import DurationDashed from './DurationDashed';
import useFormattedFlightTimes from '@/hooks/useFormattedFlightTimes';
import formatTime from '@/util/formatFlightTime';

const FlightTimeInfo = ({
    isLg,
    isMd,
    isXl,
    flight, s, idx, isSummary
}) => {
    const dashedLength = !isXl ? 20 : !isLg ? 10 : !isMd ? 6 : 4;

    const { arrivalTime, departureTime, destinationCode, originCode } = useFormattedFlightTimes(flight);


    return (
        <div className={`flex ${isSummary ? "items-center" : "items-start"} gap-6`}>
            <div className="text-center">
                {!isSummary &&
                    <time className="text-[24px] md:text-2xl text-800">{formatTime(s.departure_time)}</time>
                }
                <div className="text-[12px] text-600 text-base">{s.origin_code}</div>
            </div>

            <div className="pt-4">
                <DurationDashed
                    length={isSummary ? 4 : dashedLength}
                    width={40}
                    height={40}
                    logoWidth={24}
                    startSize={10}
                    idx={idx}
                />
            </div>

            <div className="text-center">
                {!isSummary &&
                    <time className="text-[24px] md:text-2xl text-800">{formatTime(s.arrival_time)}</time>
                }
                <div className="text-[12px] text-600 text-600 text-base">{s.destination_code}</div>
            </div>
        </div>
    );
}

export default FlightTimeInfo