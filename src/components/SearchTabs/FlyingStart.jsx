'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import tabImage from '@/assets/images/tabImage.webp';
import useIsMobile from '@/hooks/useIsMobile';
import { useTranslation } from 'react-i18next';
import useCities from '@/hooks/useCities';

const FlyingStart = ({ formik, setActiveTab }) => {
  const cities = useCities();
  const [search, setSearch] = useState('');
  const isMobile = useIsMobile()
  const { t } = useTranslation();

  const filteredCities = cities.filter((city) =>
    `${city.name} ${city.label}`.toLowerCase().includes(search.toLowerCase())
  );

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
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <h2 className="text-lg font-medium text-start">{t('flyingStart.matchingAirports')}</h2>
          {filteredCities.length > 0 ? (
            filteredCities.map((item, index) => (
              <div
                onClick={() => {


                  formik.setFieldValue("source", item.value)
                  if (isMobile) {

                    setActiveTab(1)
                  }

                }}
                key={index}
                className={`border ${formik.values.source === item.value ? 'border-secondary' : 'border-[#ccc]'}
                   ${formik.values.source === item.value ? 'bg-secondary-light' : 'bg-white'}
                  rounded-md px-4 py-2 cursor-pointer hover:bg-secondary-light hover:border-secondary-light`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-start">{item.name}</div>
                    <div
                      className={`
                                           ${formik.values.source === item.value ? 'text-black' : 'text-gray-700'}
                        text-sm text-start
                        `}

                    >{item.label}</div>
                  </div>
                  <div
                    className={

                      ` ${formik.values.source === item.value ? 'text-black' : 'text-gray-500'} text-sm font-medium`
                    }
                  >{item.value}</div>
                </div>
              </div>

            ))
          ) : (
            <div className="text-gray-500 italic text-start">  {t('flyingStart.noResults')}
            </div>
          )}
        </div>


      </div>

      {/* Right Side */}
      <div className="hidden xl:block md:block ">
        <Image
          src={tabImage}
          alt="Tab image"
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
    </div >
  );
};

export default FlyingStart;
