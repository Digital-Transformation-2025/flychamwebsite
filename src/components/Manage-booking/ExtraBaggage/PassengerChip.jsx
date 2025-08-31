import { CheckCircle } from '@phosphor-icons/react/dist/ssr';
import React from 'react'

const PassengerChip = ({ show, selectedKg }) => {
  if (!show || !selectedKg) return null;
  return (
    <span className="inline-flex items-center gap-1   text-sm md:text-[15px] font-medium">
      <span className="text-700">+{selectedKg}kg</span>
      <CheckCircle size={20} weight="fill" color="#22C55E" />
    </span>
  );
};

export default PassengerChip