import useIsMobile from '@/hooks/useIsMobile'
import { Info } from '@phosphor-icons/react'
import React from 'react'

const PassengerNote = () => {
    const isMobile = useIsMobile()
    return (
        <div className="rounded-sm mb-15 md:pr-8">
            <h1 className="text-2xl text-primary-1 font-semibold">Passenger Details</h1>

            {/* ✅ Use flex with a fixed-width icon container */}
            <div className="flex items-start gap-1 sm:gap-3 bg-100 rounded-sm my-2 p-3">
                <div className=" flex-shrink-0 flex justify-start sm:justify-center">
                    <Info size={isMobile ? 16 :22} color="#054E72" weight="fill" />
                </div>

                <p className="text-xs sm:text-sm md:text:lg text-600 leading-5">
                    Enter the required information for each passenger exactly as it appears on their passport.
                    Important: Once the booking is completed, passenger details <strong>cannot be edited or changed. </strong>
                    Please review all information carefully before proceeding.
                </p>
            </div>
        </div>
    )
}

export default PassengerNote
