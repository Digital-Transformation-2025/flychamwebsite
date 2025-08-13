'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import useFlightRouteDetails from '@/hooks/useFlightRouteDetails';

const DateNavigation = ({ isEditFlight, handleClickDate }) => {
  const router = useRouter();
  const { date, dateReturn, flighttype } = useFlightRouteDetails();

  return (
    <section className="flex justify-between items-start lg:items-center w-full max-md:flex-col max-md:gap-4">

      {/* Left: Date Info */}
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-x-2 text-sm text-[#000] font-medium">
          <span>{date}</span>
          {flighttype === 'Return' && <span>- {dateReturn}</span>}
        </div>
        <p className="text-xs text-[#000] font-normal mt-1">
          Displayed fares apply to all passengers.
        </p>
      </div>

      {/* Right: Edit or Navigation */}
      {isEditFlight ? (
        <div onClick={router.back} className="cursor-pointer flex self-center items-center gap-2">
          <span className="text-700 underline">Edit Flight</span>
          <CaretRight size={20} className="text-700" />
        </div>
      ) : (
        <div className="flex justify-between lg:justify-end w-full md:w-auto  self-center items-center gap-8 text-sm text-800">
          <CaretLeft size={20} className="cursor-pointer text-800" />
          <button onClick={() => handleClickDate('prev')} className="cursor-pointer flex items-center gap-2">
            Previous day
          </button>

          <span className="w-px h-4 bg-[var(--text-800)]" />

          Next day
          <button onClick={() => handleClickDate('next')} className="cursor-pointer flex items-center gap-2">
            <CaretRight size={20} className="cursor-pointer text-800" />
          </button>
        </div>
      )}
    </section>
  );
};

export default DateNavigation;
