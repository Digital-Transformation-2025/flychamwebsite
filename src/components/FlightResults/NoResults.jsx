'use client';
import React from 'react';
import { CaretLeft } from '@phosphor-icons/react';
import Image from 'next/image';
import nodataImg from '@/assets/images/nodata.png'; // Replace with magnifier vector if needed
import { useRouter } from 'next/navigation';

const NoResults = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6  text-center">
      {/* Icon/Image */}
      <div className="self-center mb-6 w-30 sm:w-52 md:w-45">
        <Image src={nodataImg} alt="No data found" className="w-full h-auto" />
      </div>

      {/* Title */}
      <h2 className="text-sm sm:text-lg md:text-lg  font-semibold text-gray-800 mb-4 font-montserrat">
        No flights found. Please modify your search.
      </h2>

      {/* Suggestions */}
      <ul className="flex flex-col items-start text-gray-800 space-y-2 mb-6">
        {['Check nearby airports', 'Try different dates', 'Adjust your filters'].map((tip, idx) => (
          <li
            key={idx}
            className="before:content-['•'] before:text-yellow-500 before:mr-2 before:text-2xl sm:before:text-3xl text-xs sm:text-base sm:text-md  md:text-md font-medium font-montserrat"
          >
            {tip}
          </li>
        ))}
      </ul>
      {/* Background div */}
      <div className="w-full h-full bg-[#BAA981] rounded-full" style={{ width: '100%', height: '100%', background: '#BAA981', borderRadius: 9999 }} />

      {/* Button */}
      <button
        onClick={() => router.push("/")}
        className="cursor-pointer font-semibold inline-flex items-center px-4 py-2 border border-[#003A59] text-[#003A59] rounded-md text-sm hover:bg-[#003A59] hover:text-white transition"
      >
        <CaretLeft size={16} weight="bold" className="mx-1" />
        Back to Home
      </button>
    </div>
  );
};

export default NoResults;
