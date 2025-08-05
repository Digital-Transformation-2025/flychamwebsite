'use client'
import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { arSA, enUS } from 'date-fns/locale';
import useIsMobile from '@/hooks/useIsMobile';
import useIsArabic from '@/hooks/useIsArabic';
import TripTypeSelector from '../../TripTypeSelector';
import MonthNavigation from './MonthNavigation';
import SelectedDateDisplay from './SelectedDateDisplay';
import CustomDayContent from './CustomDayContent';

const Dates = ({ formik, handleDateSelect, currentMonth, setCurrentMonth, minMonth, setMinMonth, handleReset }) => {
    const [shouldAnimateMonth, setShouldAnimateMonth] = useState(false);

    const isMobile = useIsMobile('768');
    const isArabic = useIsArabic();
    const tripType = formik.values.tripType;

    const selected =
        tripType === 'OneWay'
            ? formik.values.dateStart
                ? new Date(formik.values.dateStart)
                : undefined
            : formik.values.dateStart
                ? {
                    from: new Date(formik.values.dateStart),
                    to: formik.values.dateEnd ? new Date(formik.values.dateEnd) : undefined,
                }
                : undefined;





    const handleMonthChange = (newMonth) => {
        const normalizedNewMonth = new Date(newMonth.getFullYear(), newMonth.getMonth(), 1);
        const normalizedMinMonth = new Date(minMonth.getFullYear(), minMonth.getMonth(), 1);

        if (normalizedNewMonth < normalizedMinMonth) return;

        setCurrentMonth(normalizedNewMonth);
        setShouldAnimateMonth(true);
    };


    // Automatically stop the animation after 300ms
    useEffect(() => {
        if (shouldAnimateMonth) {
            const timeout = setTimeout(() => {
                setShouldAnimateMonth(false);
            }, 300); // match animation duration
            return () => clearTimeout(timeout);
        }
    }, [shouldAnimateMonth]);


    return (
        <div className="bg-white rounded-2xl p-3 w-full max-w-7xl mx-auto">
            <TripTypeSelector values={formik.values}
                setFieldValue={formik.setFieldValue}
                handleReset={handleReset}
            />
            <div className="hidden md:block w-full my-3 h-[1px] bg-gray-200"></div>

            <SelectedDateDisplay selected={selected} tripType={tripType} handleReset={handleReset} />

            <div
                className={`relative transition-all duration-300 ease-in-out ${shouldAnimateMonth ? 'animate-fadeInLeft' : ''
                    }`}
            >
                <MonthNavigation
                    currentMonth={currentMonth}
                    minMonth={new Date()}
                    handleMonthChange={handleMonthChange}
                />
                <div className="overflow-x-hidden w-full">


                    <DayPicker
                        today={new Date()}

                        month={currentMonth}
                        numberOfMonths={isMobile ? 1 : 2}
                        fromMonth={tripType === 'Return' ? minMonth : undefined}

                        pagedNavigation
                        locale={isArabic ? arSA : enUS}
                        disabled={{
                            before:
                                tripType === 'OneWay'
                                    ? new Date()
                                    : formik.values.dateStart
                                        ? new Date(formik.values.dateStart)
                                        : new Date()
                        }}
                        mode={tripType === 'OneWay' ? 'single' : 'range'}
                        selected={selected}
                        onSelect={handleDateSelect}
                        className="w-full flex justify-center"
                        classNames={{
                            head_cell: 'uppercase text-xs font-bold text-gray-500 text-center ',
                            caption_label: 'text-center text-lg font-semibold text-black ',
                            day: 'hover:!bg-secondary hover:text-white  rounded-full w-12 h-12 text-md text-black transition duration-300 ease-in-out  ',
                            today: 'border border-[#BAA981] rounded-full  w-12 h-12 flex items-center justify-center',

                            selected:
                                tripType === 'OneWay'
                                    ? ' text-white bg-secondary rounded-full '
                                    : `${Boolean(formik.values.dateEnd &&formik.values.dateStart ) ? 'rounded-full' : 'rounded-r-xl'} bg-secondary text-white`,
                            range_middle: '!bg-[#e6dabc61]  !text-black !rounded-sm',
                            range_start: isArabic
                                ? `${Boolean(formik.values.dateEnd &&formik.values.dateStart ) ? 'rounded-full' : 'rounded-l-xl'}  text-white`
                                : `${Boolean(formik.values.dateEnd&&formik.values.dateStart) ? 'rounded-r-xl' : 'rounded-full'}  text-white`,
                            range_end: isArabic
                                ? `${Boolean(formik.values.dateEnd &&formik.values.dateStart) ? 'rounded-full' : 'rounded-r-xl'}  text-white`
                                : `${Boolean(formik.values.dateEnd &&formik.values.dateStart) ? 'rounded-l-xl' : 'rounded-full'}  text-white`,
                        }}
                        components={{
                            DayContent: (props) => (
                                <CustomDayContent {...props} isArabic={isArabic} />
                            ),
                        }}
                    />
                </div>
                <div className="hidden md:block absolute left-1/2 top-5 bottom-5 w-[1px] bg-gray-200"></div>
            </div>

            <div className="hidden md:block w-full my-3 h-[1px] bg-gray-200"></div>
        </div>
    );
};

export default React.memo(Dates);
