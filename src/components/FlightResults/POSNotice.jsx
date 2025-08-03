'use client';
import useIsMobile from '@/hooks/useIsMobile';
import getFlightCurrencyAndRegion from '@/util/getFlightCurrencyAndRegion';
import { X } from '@phosphor-icons/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const POSNotice = ({ setShowNotice, setShowPosModal }) => {
  const isMobile = useIsMobile();
  const { flights, IndirectAirPort } = useSelector((s) => s.flights);
  const { currency, region } = getFlightCurrencyAndRegion(flights, IndirectAirPort);

  // ✅ Toggle state for Read More / Read Less
  const [showFullText, setShowFullText] = useState(false);

  // ✅ Full message (unchanged)
  const fullMessage =
    <>
      <span className='text-700'>

        Please note: Your booking will follow {region}'s local terms and consumer protection policies,
        and all charges will be processed in {currency}. If you wish to book from
        a different region, you can change your region anytime;
      </span>
      <button
        type="button"
        onClick={() => setShowPosModal?.(true)}
        className="text-primary-1 underline font-semibold ml-1 xs:text-xs sm:text-xs md:text-sm lg:text-md"
      >
        “Change Region”
      </button>
      {isMobile &&
        <div>
          <button
            type="button"
            onClick={() => setShowFullText(!showFullText)}
            className="cursor-pointer text-600 font-semibold  mt-1 xs:text-xs sm:text-xs md:text-sm lg:text-md"
          >
            {showFullText ? 'Read less' : 'Read more'}
          </button>
        </div>
      }
    </>

  // ✅ Shortened message for mobile
  const shortMessage =
    <div className='flex items-start flex-col sm:flex-row'>
      <p className='text-700'>

        Please note: Your booking will follow ${region}'s local terms..
      </p>
      <div>
        <button
          type="button"
          onClick={() => setShowFullText(!showFullText)}
          className="cursor-pointer text-600 font-bold  xs:text-xs sm:text-xs md:text-sm lg:text-md"
        >
          {showFullText ? 'Read less' : 'Read more'}
        </button>
      </div>
    </div>

  return (
    <div className="relative bg-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between text-sm gap-2 sm:gap-4">
      <div className="flex-1">
        <p className="xs:text-xs sm:text-sm md:text-md lg:text-lg font-semibold text-primary-900 mb-1">
          {`You have been redirected to the ${region} point of sale`}
        </p>

        <p className="leading-relaxed xs:text-xs sm:text-xs md:text-sm lg:text-md text-600">
          {/* ✅ Mobile logic for short/expanded text */}
          {isMobile ? (
            <>
              {showFullText ? fullMessage : shortMessage}
            </>
          ) : (
            fullMessage
          )}


        </p>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setShowNotice?.(false)}
        className="absolute top-2 right-2 cursor-pointer self-start sm:self-auto text-800 hover:text-700 xs:text-xs sm:text-xs md:text-sm lg:text-md"
        aria-label="Close notice"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default POSNotice;
