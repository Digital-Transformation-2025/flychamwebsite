'use client'
import React from 'react';
import { format, isSameDay } from 'date-fns';
import useIsMobile from '@/hooks/useIsMobile';

const SelectedDateDisplayModifyBox = ({ selected, tripType, handleReset, hasClickCalendar }) => {
    const isMobile = useIsMobile()
    const text = tripType === 'Return' && selected?.from ? (
        <div className="flex items-center justify-center gap-2">
            Departure: <strong>{format(selected.from, 'dd MMM yyyy')}</strong> — Return:
            {!selected.to ? null : (
                <>

                    <strong>{format(selected.to, 'dd MMM yyyy') || " "}</strong>
                    {!isMobile &&
                        <button
                            onClick={handleReset}
                            className="cursor-pointer underline text-main text-sm hover:text-[#002233]"
                        >
                            Reset Dates
                        </button>
                    }
                </>
            )}
        </div>
    ) : tripType === 'OneWay' && selected ? (
        <div className="flex items-center justify-center gap-2">
            Departure: <strong>{format(selected, 'dd MMM yyyy') || " "}</strong>
            {!isMobile &&
                <button
                    onClick={handleReset}
                    className="cursor-pointer underline text-main text-sm hover:text-[#002233]"
                >
                    Reset Dates
                </button>
            }
        </div>
    ) : null;

    return (
        <div className="text-center w-full text-sm my-5 mb-2 min-h-[20px] transition-opacity duration-300" style={{ opacity: text ? 1 : 0 }}>
            {text || '‎'} {/* invisible non-breaking space to preserve height */}
        </div>
    );
};

export default SelectedDateDisplayModifyBox;
