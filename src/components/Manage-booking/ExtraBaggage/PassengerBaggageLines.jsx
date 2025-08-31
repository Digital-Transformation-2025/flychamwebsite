import React from 'react'

const PassengerBaggageLines = ({ handKg = 7, checkedKg = 30, hand, checked }) => (
    <div className="mt-2 space-y-1">
        <>
            <p className="text-[12px]">
                <span className="font-medium text-700">{handKg} kg</span>
                <span className="text-500"> hand baggage</span>
            </p>
            <p className="text-[12px] text-500">
                <span className="font-medium text-700">{checkedKg} kg</span> Checked baggage
            </p>
        </>
    </div>
);

export default PassengerBaggageLines