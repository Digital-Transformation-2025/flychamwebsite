'use client'
import React, { useEffect, useState } from 'react'
import DurationDashed from './DurationDashed';
import formatTime from '@/util/formatFlightTime';
import useIconSizes from '@/hooks/useIconSizes';

const FlightTimeInfo = ({
    isLg,
    isMd,
    isXl,
    flight, s, idx, isSummary
}) => {
    // const dashedLength = !isXl ? 20 : !isLg ? 10 : !isMd ? 6 : 4;
    const [dashedLength, setDashedLength] = useState(20);
    const { container, logo } = useIconSizes();


    useEffect(() => {
        const updateLength = () => {
            const w = window.innerWidth;
            const breakpoints = [
                [1800, 20],
                [1700, 15],
                [1600, 12],
                [1500, 8],
                [1400, 4],
                [1300, 2],
                [1280, 1],
                [1250, 20],
                [1200, 20],
                [1100, 18],
                [1050, 15],
                [1000, 13],
                [900, 23],
                [800, 18],
                [700, 15],
                [600, 14],
                [500, 7],
                [400, 3],
                [350, 2],
                [300, 1],
                [0, 2], // default (smallest)
            ];

            const [, length] = breakpoints.find(([minWidth]) => w >= minWidth);
            setDashedLength(length);
        };

        updateLength();
        window.addEventListener('resize', updateLength);
        return () => window.removeEventListener('resize', updateLength);
    }, []);

    return (
        <div className=" flex items-center gap-6">
            {/* left time/city – fixed width + tabular nums */}
            <div className="text-center w-full md:w-[96px]">
                {!isSummary && (
                    <time className="tabular-nums  text-lg sm:text-2xl  md:text-2xl text-800">
                        {formatTime(s.departure_time)}
                    </time>
                )}
                <div className="text-xs text-600">{s.origin_code}</div>
            </div>

            {/* dashed line centered */}
            <div className="flex-1 flex items-center justify-center">
                <DurationDashed
                    length={isSummary ? 4 : dashedLength}
                    width={container}
                    height={container}
                    logoWidth={logo}
                    startSize={10}
                    idx={idx}
                />
            </div>

            {/* right time/city – fixed width + tabular nums */}
            <div className="text-center w-full md:w-[96px]">
                {!isSummary && (
                    <time className="tabular-nums text-lg sm:text-2xl md:text-2xl text-800">
                        {formatTime(s.arrival_time)}
                    </time>
                )}
                <div className="text-xs text-600">{s.destination_code}</div>
            </div>
        </div>
    );
}

export default FlightTimeInfo