import { CreditCard } from '@phosphor-icons/react/dist/ssr';
import React, { useState } from 'react';

const StepFour = ({ cancellationOptions, setFieldValue, values }) => {
    const [verificationSent, setVerificationSent] = useState(false);
    const [last4, setLast4] = useState("");

    const handleChange = (e) => {
        // Allow only numbers, max 4 digits
        const value = e.target.value.replace(/\D/g, "").slice(0, 4);
        setLast4(value);
    };
    const handleSendCode = () => {
        setVerificationSent(true);
        setTimeout(() => alert('Verification code sent!'), 2000);
    };

    const renderTable = () => (
        <div className="w-full bg-[#FDFDFC] shadow-md rounded-lg ">
            {/* Header */}
            <div className="flex bg-[#F5F5F4] px-4 py-2 ">
                <div className="w-1/4 text-sm text-[#282826] ">Routes</div>
                <div className="w-1/4 text-sm text-[#282826] ">Passengers</div>
                <div className="w-1/4 text-sm text-[#282826] ">Ticket number</div>
                <div className="w-1/4 text-sm text-[#282826] ">Price</div>
            </div>

            {/* Body */}
            <div className="px-4 py-2 w-full">
                {/* First Row */}
                <div className="flex justify-between py-2">
                    <div className="w-1/4 flex gap-2 text-sm font-semibold text-[#054E72]">
                        <span>Damascus to</span>
                        <span>Dubai</span>
                    </div>
                    <div className="w-1/4 text-sm text-[#054E72] font-semibold">MR. Mouayed Hawari</div>
                    <div className="w-1/4 text-sm text-[#054E72] font-semibold">386230452362</div>
                    <div className="w-1/4 text-sm font-semibold text-[#054E72]">900.00</div>
                </div>
            </div>
        </div>
    );


    const renderRefundDetails = () => (
        <div className="space-y-4 mt-4">
            {[
                ['Total ticket price', 'USD 1065.00'],
                ['Fine for cancel', 'USD 190.00'],
                ['Taxes for adult (1)', 'USD 50.00'],
                ['Taxes for child (1)', 'USD 50.00'],
                ['Total taxes', 'USD 200.00'],
                ['Total penalty', 'USD 150.00'],
                ['Payment getaway', 'USD 5.00'],
            ].map(([label, amount], idx) => (
                <div key={idx} className="flex justify-between">
                    <span>{label}</span>
                    <span>{amount}</span>
                </div>
            ))}
            <div className="flex justify-between font-semibold mt-4">
                <span>Net refund amount</span>
                <span>USD 695.00</span>
            </div>
            <div className="text-sm text-gray-500 mt-4">
                <p>Processing time: 20 days</p>
                <p>Refund will return by cash in our office</p>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col lg:flex-row justify-between gap-8">
            {/* Left Section: Cancellation Summary */}
            <div className="flex-[75%]">
                <h3 className="text-lg md:text-2xl text-700 font-semibold mb-6">Review Cancellation Summary</h3>
                <div className=" mb-8 ">{renderTable()}</div>

                {/* Verification Section */}
                <div className=" border rounded-lg p-4 mb-8 bg-50 border-[#F5F5F4]">
                    <div className='w-full max-w-md'>


                        <h4 className="text-lg font-semibold text-700 mb-4">Verification Required</h4>
                        <p className="text-sm mb-4 text-800">
                            Pleas enter Last 4 digits of the credit card that used for this booking.
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="w-full flex items-center">
                                <div className="w-full max-w-md bg-gray-100 rounded-md border border-gray-200 flex items-center px-3 py-2">
                                    {/* Card Icon */}
                                    <CreditCard className="w-5 h-5 text-gray-400 mr-3" />

                                    {/* Hidden digits */}
                                    <div className="flex space-x-4 text-gray-400">
                                        <span className="tracking-widest">••••</span>
                                        <span className="tracking-widest">••••</span>
                                        <span className="tracking-widest">••••</span>
                                    </div>

                                    {/* Input for last 4 digits */}
                                    <input
                                        type="text"
                                        value={last4}
                                        onChange={handleChange}
                                        maxLength={4}
                                        className="ml-4 bg-transparent outline-none font-semibold text-gray-600 w-16 tracking-widest text-center"
                                        placeholder="XXXX"
                                    />
                                </div>
                            </div>
                            <button disabled className="px-6 py-2 text-white bg-primary-1 rounded-md">Verify</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section: Refund Summary */}
            <div className="flex-[25%]">
                <h3 className="text-2xl font-medium mb-6">Refund Summary</h3>
                <div className="border rounded-lg p-4 mb-8">
                    <h4 className="font-medium">Adult (1), child (1)</h4>
                    {renderRefundDetails()}
                </div>

                {/* Cancellation Policy */}
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="policy" className="h-4 w-4 accent-primary-1" />
                    <label htmlFor="policy" className="text-sm text-gray-700">
                        I understand the cancellation policy and agree to the refund terms. I acknowledge that the refund
                        amount is calculated based on fare rules and cancellation fees.
                    </label>
                </div>
            </div>
        </div>
    );
};

export default StepFour;
[]