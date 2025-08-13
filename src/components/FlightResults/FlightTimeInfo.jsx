'use client'
import React from 'react'
import DurationDashed from './DurationDashed';
import formatTime from '@/util/formatFlightTime';

const FlightTimeInfo = ({
    isLg,
    isMd,
    isXl,
    flight, s, idx, isSummary
}) => {
    const dashedLength = !isXl ? 20 : !isLg ? 10 : !isMd ? 6 : 4;



    return (
   <div className="flex items-center gap-6">
  {/* left time/city – fixed width + tabular nums */}
  <div className="text-center w-[88px] md:w-[96px]">
    {!isSummary && (
      <time className="tabular-nums text-[24px] md:text-2xl text-800">
        {formatTime(s.departure_time)}
      </time>
    )}
    <div className="text-[12px] text-600">{s.origin_code}</div>
  </div>

  {/* dashed line centered */}
  <div className="flex-1 flex items-center justify-center">
    <DurationDashed
      length={isSummary ? 4 : dashedLength}
      width={40}
      height={40}
      logoWidth={24}
      startSize={10}
      idx={idx}
    />
  </div>

  {/* right time/city – fixed width + tabular nums */}
  <div className="text-center w-[88px] md:w-[96px]">
    {!isSummary && (
      <time className="tabular-nums text-[24px] md:text-2xl text-800">
        {formatTime(s.arrival_time)}
      </time>
    )}
    <div className="text-[12px] text-600">{s.destination_code}</div>
  </div>
</div>
    );
}

export default FlightTimeInfo