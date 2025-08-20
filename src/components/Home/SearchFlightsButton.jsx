'use client'
import React from 'react';

const SearchFlightsButton = ({ handleSubmit, values, submitted }) => {
  const { source, destination, dateStart, tripType, dateEnd } = values;

  const isDisabled = !dateStart || !source || !destination || (tripType === "Return" && !dateEnd) || submitted

  return (
    <button
      id="search-flight-button"
      disabled={isDisabled}
      onClick={handleSubmit}
      type="button"
      className={`w-full mt-4 flex justify-center items-center gap-[10px] h-[56px] p-[10px]
        flex-shrink-0 rounded-[8px] text-sm font-medium transition
        ${isDisabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-[#BAA981] text-white cursor-pointer hover:bg-[#a89773]'
        }`}
    >
      Search flights
    </button>
  );
};

export default SearchFlightsButton;
