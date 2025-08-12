'use client';
import React, { useState, useRef, useEffect } from 'react';
import { AirplaneTakeoff, AirplaneLanding } from '@phosphor-icons/react';
import SwapIcon from './SwapIcon';

const CityBox = ({ icon, label, city, airport, onClick, AirPortsComponent }) => (
  <div
    onClick={onClick}
    className="w-full flex-1 text-start flex items-center space-x-4 bg-[#F5F5F4] hover:bg-[#E7E7E5] transition-colors duration-200 rounded-xl px-6 py-5 cursor-pointer"
  >
    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-[#1E1E1E]">{city}</p>
      <p className="text-xs text-gray-500">{airport}</p>
    </div>
  </div>
);

const FromToSelector = ({ setFieldValue, setShowModal, setShowMobileModal, cities, values, isMobile, handleSwitch, isResultsPage, AirPortsSourceComponent, AirPortsDestenationComponent, openAirPortsDropdown, setOpenAirPortsDropdown }) => {
  const fromRef = useRef(null);
  const toRef = useRef(null);



  const getCityInfo = (id, fallbackCity, fallbackAirport) => {
    const city = cities?.find((c) => c.id === id)?.airPortTranslations?.[0] || {};
    return {
      city: city.city || fallbackCity,
      airport: city.airPortName || fallbackAirport
    };
  };

  const sourceInfo = getCityInfo(values.source, 'Departure city', 'Select your origin');
  const destinationInfo = getCityInfo(values.destination, 'Arrival city', 'Select your destination');


  const handleClickCard = (type) => {
    console.log('type', type);

    if (isResultsPage) {
      setOpenAirPortsDropdown(prev => prev === type ? null : type);
      return;
    }

    if (isMobile) {
      setFieldValue("type", type === "from" ? 0 : 1);
      setShowMobileModal(true);
    } else {
      setShowModal(true);
    }
  };






  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        (fromRef.current && fromRef.current.contains(e.target)) ||
        (toRef.current && toRef.current.contains(e.target))
      ) {
        return;
      }
      setOpenAirPortsDropdown(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative flex ${isMobile ? 'flex-col my-3 gap-3' : 'flex-row gap-7'} items-center`}>
      {/* FROM */}
      <div ref={fromRef} className="relative w-full">
        <CityBox
          icon={<AirplaneTakeoff weight="fill" size={16} color="white" />}
          label="From"
          city={sourceInfo.city}
          airport={sourceInfo.airport}
          onClick={() => handleClickCard('from')}
        />
        {openAirPortsDropdown === 'from' && isResultsPage && (
          <div className="absolute left-0 mt-1 bg-white border border-[#ccc] shadow-md  rounded-lg p-4 w-full z-10">
            {/* Dropdown content for "From" */}
            {AirPortsSourceComponent}
          </div>
        )}
      </div>

      {/* SWAP */}
      <div
        className="absolute left-1/2 top-1/2 z-10 cursor-pointer -translate-y-1/2"
        style={{ transform: `translateX(${isMobile ? '25vw' : '-50%'})` }}
        onClick={handleSwitch}
      >
        <div className="w-12 h-12 rounded-full bg-white hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center">
          <SwapIcon isMobile={isMobile} />
        </div>
      </div>

      {/* TO */}
      <div ref={toRef} className="relative w-full">
        <CityBox
          icon={<AirplaneLanding weight="fill" size={16} color="white" />}
          label="To"
          city={destinationInfo.city}
          airport={destinationInfo.airport}
          onClick={() => handleClickCard('to')}
        />

        {openAirPortsDropdown === 'to' && isResultsPage && (
          <div className="absolute left-0 mt-1 bg-white shadow-md border border-[#ccc] rounded-lg p-4 w-full z-10">
            {/* Dropdown content for "To" */}
            {AirPortsDestenationComponent}
          </div>
        )}
      </div>
    </div>
  );
};

export default FromToSelector;
