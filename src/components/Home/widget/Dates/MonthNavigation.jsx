'use client'
import React from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const MonthNavigation = ({ currentMonth, minMonth, handleMonthChange }) => {
  // Normalize dates to first of the month for accurate comparison
  const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
  const minAllowedMonth = new Date(minMonth.getFullYear(), minMonth.getMonth(), 1);

  const isPrevDisabled = prevMonth < minAllowedMonth;

  return (
    <div className="flex justify-between items-center  ">
      <button
        onClick={() => handleMonthChange(prevMonth)}
        disabled={isPrevDisabled}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
          isPrevDisabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-[#f4f4f4] hover:bg-[#e2e2e2] cursor-pointer'
        }`}
      >
        <CaretLeft size={20} className="text-gray-700" />
      </button>

      <button
        onClick={() =>
          handleMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
        }
        className="w-9 h-9 rounded-full bg-[#f4f4f4] flex items-center justify-center hover:bg-[#e2e2e2] transition cursor-pointer"
      >
        <CaretRight size={20} className="text-gray-700" />
      </button>
    </div>
  );
};

export default MonthNavigation;
