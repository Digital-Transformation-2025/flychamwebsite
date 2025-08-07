'use client'
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import CustomCheckbox from '../Ui/CustomCheckbox';

const AirportList = ({ search, setSearch, type, values, setFieldValue, isMobile, sliderRef, getCitiesArray, setOpenAirPortsDropdown }) => {
  const { airPorts } = useSelector(state => state.flights);

  const iataSourceCode = airPorts.items.find((item) => item.id === values.source)?.iataCode;

  const citiesArray = getCitiesArray(type, iataSourceCode, search);



  const handleAirportSelection = ({ type, id }) => {
    setFieldValue(type, id);

    switch (type) {
      case "source":
        setSearch("");

        setFieldValue("destination", "");
        if (isMobile && sliderRef?.current) sliderRef.current.slickGoTo(1);
        setFieldValue("type", 1);
        break;

      case "destination":
        setSearch("");
        if (isMobile && sliderRef?.current) sliderRef.current.slickGoTo(2);
        setFieldValue("type", 2);
        break;

      default:
        break;
    }
    setOpenAirPortsDropdown(false)
  };


  return (
    <div>
      <div className="flex  flex-col md:flex-row justify-between items-start  my-2 md:my-0">

        <p className="text-sm font-medium text-gray-600 mb-4">Matching Airports</p>
        <CustomCheckbox
          checked={values.nearby}
          onChange={() => setFieldValue("nearby", !values.nearby)}
          label="Include nearby airports"
        />

      </div>
      <div className="bg-gray-300 w-full h-[0.5px]">

      </div>
      <div
        className={`${!isMobile && 'max-h-[300px]'} overflow-y-auto pr-1`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="space-y-2">
          {(citiesArray || [])?.map((item) => {
            const { id, iataCode, airPortTranslations } = item;
            const { city, country, airPortName } = airPortTranslations[0];

            return (
              <div
                key={id}
                onClick={() => handleAirportSelection({ type, id })}
                className={`flex items-center justify-between border-b border-gray-300 p-3 rounded-md transition-colors duration-150 hover:bg-[#F5F5F4] cursor-pointer ${values[type] === iataCode ? 'bg-[#E5E5E3]' : ''
                  }`}
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">{airPortName}</p>
                  <p className="text-xs text-gray-500 my-1 md:my-0">{`${country} ${city}`}</p>
                </div>
                <div className="bg-main w-13  text-white text-xs px-3 py-1 rounded-md font-semibold">{iataCode}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


export default AirportList;
