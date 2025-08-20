'use client';

import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { addMonths, subMonths } from 'date-fns';
import 'react-day-picker/dist/style.css';
import useIsMobile from '@/hooks/useIsMobile';
import useIsArabic from '@/hooks/useIsArabic';
import { arSA, enUS } from 'date-fns/locale';

const TravelWhen = ({ formik, activeTap }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selected, setSelected] = useState(undefined);
  const isTab = useIsMobile('1024');
  const isMb = useIsMobile('768')
  const numberOfMonths = isMb ? 1 : isTab ? 2 : 3;
  const isArabic = useIsArabic()
  const handlePrev = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNext = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  useEffect(() => {
    const format = (date) => date.toLocaleDateString('en-CA'); // → 'YYYY-MM-DD'

    if (activeTap === 0 && selected) {
      // Single mode
      formik.setFieldValue('dateStart', format(selected));
      formik.setFieldValue('dateEnd', '');
    } else if (activeTap !== 0 && selected?.from) {
      formik.setFieldValue('dateStart', format(selected.from));
      formik.setFieldValue(
        'dateEnd',
        selected.to ? format(selected.to) : ''
      );
    }
  }, [selected, activeTap]);

  return (
    <div className="w-full max-w-7xl mx-auto bg-white p-4 md:p-6 rounded-2xl shadow">
      <div dir='ltr' className="flex justify-between items-center mb-4 px-2">
        <button
          onClick={handlePrev}
          className="cursor-pointer text-xl px-3 py-1 rounded-full hover:bg-gray-200 transition"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="cursor-pointer text-xl px-3 py-1 rounded-full hover:bg-gray-200 transition"
        >
          →
        </button>
      </div>

      <div className="text-sm">
        <DayPicker
          month={currentMonth}
          numberOfMonths={numberOfMonths}
          pagedNavigation
          // showOutsideDays
          locale={isArabic ? arSA : enUS}
  disabled={{ before: new Date() }} // ✅ Disable past days

          mode={activeTap === 0 ? 'single' : 'range'}
          selected={selected}
          onSelect={setSelected}
          className="flex justify-center"
          classNames={{
            today: 'border-main',
            selected: `bg-main border-main text-white ${!activeTap && 'rounded'}`,
            range_middle: 'bg-main-light text-black',
            range_start: isArabic ? 'rounded-r-xl' : 'rounded-l-xl',
            range_end: isArabic ? 'rounded-l-xl' : 'rounded-r-xl',
          }}

        />
      </div>
    </div>
  );
};

export default TravelWhen;
