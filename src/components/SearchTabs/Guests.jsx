'use client';

import useIsMobile from '@/hooks/useIsMobile';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Guests = ({ formik, setActiveTab }) => {
  const { t } = useTranslation();
  const [travelClass, setTravelClass] = useState(formik.values.class || 'Economy');

  const guestTypes = [
    { id: 'adults', label: t('labels.adults'), sub: t('subs.adults') },
    { id: 'children', label: t('labels.children'), sub: t('subs.children') },
    { id: 'infants', label: t('labels.infants'), sub: t('subs.infants') }
  ];

  const updateCount = (type, delta) => {
    const current = formik.values[type];
    let newValue = Math.max(0, current + delta);

    // Ensure adult >= infant rule
    if (type === 'infants') {
      const currentAdults = formik.values.adults;
      if (newValue > currentAdults) {
        formik.setFieldValue('adults', newValue); // increase adults to match infants
      }
    }

    formik.setFieldValue(type, newValue);
  };

  useEffect(() => {
    formik.setFieldValue('class', travelClass);
  }, [travelClass]);

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-8">
      {/* Guest Selection */}
      <div className="flex-1">
        <h2 className="text-lg text-start font-bold text-main mb-4">{t('guestsTitle')}</h2>
        <div className="space-y-4">
          {guestTypes.map(({ id, label, sub }) => (
            <div key={id} className="flex justify-between items-center bg-[#f0e9d5] rounded-lg p-4">
              <div>
                <div className="text-main font-semibold text-start">{label}</div>
                <div className="text-sm text-gray-600 text-start">{sub}</div>
              </div>
              <div className="flex items-center space-x-4 text-main font-bold">
                <button
                  className="cursor-pointer text-2xl px-2"
                  onClick={() => updateCount(id, -1)}
                >
                  −
                </button>
                <span>{formik.values[id]}</span>
                <button
                  className="cursor-pointer text-2xl px-2"
                  onClick={() => updateCount(id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Class & Promo */}
      <div className="flex flex-col space-y-6">
        {/* Class */}
        <div>
          <h2 className="text-lg font-bold text-[#003e61] mb-2 text-start">{t('classTitle')}</h2>
          <div className="space-y-2">
            {['Economy', 'Business'].map((option) => (
              <label
                key={option}
                className={`flex items-center justify-between border rounded-md px-4 py-2 cursor-pointer transition 
                ${travelClass === option
                  ? 'border-[#d4c08f] bg-[#fff7e8] text-[#d4c08f]'
                  : 'border-gray-300 text-gray-500'
                }`}
              >
                <span className="font-medium text-main">{t(`classOptions.${option.toLowerCase()}`)}</span>
                <input
                  type="radio"
                  name="class"
                  value={option}
                  checked={travelClass === option}
                  onChange={() => setTravelClass(option)}
                  className="form-radio text-[#d4c08f] accent-[#053A55] h-5 w-5"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Promo Coupon */}
        <div>
          <h2 className="text-lg font-bold text-main mb-2 text-start">{t('promoTitle')}</h2>
          <input
            type="text"
            name="promo"
            value={formik.values.promo}
            onChange={formik.handleChange}
            placeholder={t('promoPlaceholder')}
            className="rounded-md px-4 py-2 w-full focus:outline-none border"
            style={{
              borderColor: 'var(--color-secondary-light)',
              '--tw-ring-color': 'var(--color-main)',
              '--tw-border-color': 'var(--color-main)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Guests;
