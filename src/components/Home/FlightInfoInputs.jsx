'use client'
import React from "react";
import { CalendarBlank, UsersThree } from "@phosphor-icons/react";

const FlightInfoInputs = ({ formik, setShowMobileModal }) => {
    const inputStyle = "flex items-center md:items-start gap-2 bg-[#F5F5F4] rounded-xl px-6 py-3 w-full h-[80px] md:h-auto";

    const formatDate = (date) => {
        if (!date) return "Select date";
        const options = { day: "2-digit", month: "short", year: "numeric" };
        return new Date(date)
            .toLocaleDateString("en-GB", options)
            .toUpperCase(); // e.g., "30 JUN 2025"
    };

    const { source, destination, dateStart, dateEnd, adults, children, infants, class: travelClass } = formik.values;

    const totalGuests = adults + children + infants;
    const guestLabel = `Guest${totalGuests > 1 ? "s" : ""} x ${totalGuests}`;
    const openDates = () => {

        formik.setFieldValue("type", 3);
        setShowMobileModal(true);
    };

    const openGuestes = () => {
        if (destination && source) {
            formik.setFieldValue("type", 2)
            setShowMobileModal(true)
        }

    }

    return (
        <div className="flex flex-col gap-3 w-full">
            {/* Dates */}
            <div className="flex gap-3 h-[80px] md:h-auto">
                {/* Departure */}
                <div className={inputStyle} onClick={openDates}>
                    <CalendarBlank size={20} className="text-gray-500 mt-[2px]" />
                    <div>
                        <p className="text-sm text-gray-400 font-medium">Departure</p>
                        <p className="text-md text-[#1E1E1E] font-medium">
                            {formatDate(dateStart)}
                        </p>
                    </div>
                </div>

                {/* Return */}
                {formik.values.tripType === 'Return' &&
                    <div className={inputStyle} onClick={openDates}>
                        <CalendarBlank size={20} className="text-gray-500 mt-[2px]" />
                        <div>
                            <p className="text-sm text-gray-400 font-medium">Return</p>
                            <p className="text-md text-[#1E1E1E] font-medium">
                                {formatDate(dateEnd)}
                            </p>
                        </div>
                    </div>
                }
            </div>

            {/* Passengers & Class */}
            <div className={inputStyle} onClick={openGuestes}>
                <UsersThree size={20} className="text-gray-500 mt-[2px]" />
                <div>
                    <p className="text-sm text-gray-400 font-medium">Passengers & Class</p>
                    <p className="text-md text-main font-medium">
                        {guestLabel}, {travelClass}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FlightInfoInputs;
