'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import CustomCheckbox from '../Ui/CustomCheckbox';

const AirportList = ({ search, setSearch, type, values, setFieldValue, isMobile, sliderRef, getCitiesArray, setOpenAirPortsDropdown, isResultsPage }) => {
  const { airPorts } = useSelector(state => state.flights);

  const iataSourceCode = airPorts.items.find((item) => item.id === values.source)?.iataCode;

  const citiesArray = getCitiesArray(type, iataSourceCode, search);



  const handleAirportSelection = ({ type, id }) => {

    setFieldValue(type, id);

    switch (type) {
      case "source":
        setSearch("");

        setFieldValue("destination", "");
        setFieldValue("type", 1);
        if (isMobile && sliderRef?.current) sliderRef.current.slickGoTo(1);
        break;

      case "destination":
        setSearch("");
        setFieldValue("type", 2);
        if (isMobile && sliderRef?.current) sliderRef.current.slickGoTo(2);
        break;

      default:
        break;
    }
    setOpenAirPortsDropdown(false)
  };


  return (
    <div>
      <div className="flex  flex-col md:flex-row justify-between items-start  my-2 mb-6 md:my-0">

        <p className="text-sm font-medium text-gray-600 mb-4">Matching Airports</p>
        {(!isResultsPage || isMobile) &&
          <CustomCheckbox
            checked={values.nearby}
            onChange={() => setFieldValue("nearby", !values.nearby)}
            label="Include nearby airports"
          />
        }

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
                // Fire before blur closes the popover
                onMouseDown={(e) => {
                  e.preventDefault();            // prevents focus change that causes blur
                  handleAirportSelection({ type, id });
                }}
                // keep onClick just in case for keyboard/Touch (optional)
                onClick={() => handleAirportSelection({ type, id })}
                className={`flex items-center justify-between border-b border-gray-300 p-3 transition-colors duration-150 hover:bg-[#F5F5F4] cursor-pointer ${values[type] === iataCode ? 'bg-[#E5E5E3]' : ''
                  }`}
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">{airPortName}</p>
                  <p className="text-xs text-gray-500 my-1 md:my-0">{`${country} ${city}`}</p>
                </div>
                <div className="bg-main w-14 text-center  text-white text-xs p-2 rounded-md font-semibold">{iataCode}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


export default AirportList;
