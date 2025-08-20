// app/destinations/page.js (or any route file)
'use client'

import Image from "next/image";
import CustomCalendar from "../Ui/CustomCalendar";
import tabImage from '@/assets/images/tabImage.webp'; // Adjust path if needed
import { useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import useCities from "@/hooks/useCities";
import { useTranslation } from "react-i18next";

const Destinations = ({ formik, setActiveTab }) => {
  const cities = useCities();
  const { t } = useTranslation();

  const [search, setSearch] = useState('');
  const isMobile = useIsMobile()

const source = formik.values.source;

const filteredCities = cities.filter((city) => {
  const matchesSearch = `${city.name} ${city.label}`.toLowerCase().includes(search.toLowerCase());

  if (source === 'DAM' || source === 'ALP') {
    // Show all cities except DAM and ALP
    return matchesSearch && city.value !== 'DAM' && city.value !== 'ALP';
  } else {
    // Show only DAM and ALP
    return matchesSearch && (city.value === 'DAM' || city.value === 'ALP');
  }
});

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      {/* Left Side */}
      <div className="space-y-4">
        <label htmlFor="origin" className="block text-xl font-semibold text-start">
          {t('flyingStart.travelFrom')}
        </label>
        <input
          type="text"
          placeholder={t('flyingStart.placeHolder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border-2 rounded-md px-4 py-2 transition focus:outline-none"
          style={{
            borderColor: 'var(--color-secondary-light)',
            '--tw-ring-color': 'var(--color-main)',
            '--tw-border-color': 'var(--color-main)',
          }}
        />


        {/* Suggestions */}
        {/* {search && ( */}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <h2 className="text-lg font-medium text-start">{t('flyingStart.matchingAirports')}</h2>
          {filteredCities.length > 0 ? (
            filteredCities.filter((c) => c.value !== formik.values.source).map((item, index) => (
              <div
                key={index}

                onClick={() => {

                  formik.setFieldValue("destination", item.value)
                  if (isMobile) {

                    setActiveTab(2)
                  }

                }}
                className={`border ${formik.values.destination === item.value ? 'border-secondary' : 'border-[#ccc]'}
                   ${formik.values.destination === item.value ? 'bg-secondary-light' : 'bg-white'}
                  rounded-md px-4 py-2 cursor-pointer hover:bg-secondary-light hover:border-secondary-light`}               >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-start">{item.name}</div>
                    <div className={`
                                           ${formik.values.destination === item.value ? 'text-black' : 'text-gray-700'}
                        text-sm text-start
                        `}>{item.label}</div>
                  </div>
                  <div
                    className={

                      ` ${formik.values.destination === item.value ? 'text-black' : 'text-gray-500'} text-sm font-medium`
                    }                    >{item.value}</div>
                </div>
              </div>

            ))
          ) : (
            <div className="text-gray-500 italic text-start"> {t('flyingStart.noResults')}</div>
          )}
        </div>
        {/* )} */}


      </div>

      {/* Right Side */}
      <div className="w-full rounded-lg overflow-hidden">
        <Image
          src={tabImage}
          alt="Tab image"
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default Destinations;
