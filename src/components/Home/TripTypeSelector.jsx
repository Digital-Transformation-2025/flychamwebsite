'use client'
import React, { useEffect, useState } from 'react';

const TripTypeSelector = ({ setFieldValue, values, handleReset }) => {
  const { tripType } = values;

  const handleSelect = (type) => {
    setFieldValue("tripType", type);
    handleReset()
  };

  const TripTypeButton = ({ label, value, tripType, handleSelect }) => (
    <button
      onClick={() => handleSelect(value)}
      className={`relative z-10 w-1/2 text-md md:text-sm rounded-[20px]
        font-medium transition-colors duration-300
        ${tripType === value ? 'text-white ' : 'text-primary-1 bg-transparent '}`}
    >
      {label}
    </button>
  );

  return (
    <div className="relative w-full md:w-[250px] h-[55px] px-[8.65px] py-[12px] bg-[#f5f5f4] rounded-[12px] inline-flex justify-center md:justify-start items-center gap-[18.17px] transition-all duration-300">

      {/* Moving background */}
      <div
        className={`absolute top-1 rounded-[8px] bottom-1 w-[50%] bg-main transition-all duration-500 ease-in-out ${tripType === 'Return' ? 'left-0' : 'left-[50%]'}`}
      />

      {/* Trip type buttons */}
      <TripTypeButton label="Round-trip" value="Return" tripType={tripType} handleSelect={handleSelect} />
      <TripTypeButton label="One-way" value="OneWay" tripType={tripType} handleSelect={handleSelect} />
    </div>
  );
};

export default TripTypeSelector;
