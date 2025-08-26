import { CreditCard } from '@phosphor-icons/react/dist/ssr';
import React, { useRef, useState } from 'react';
import RefundSummary from './RefundSummary';
import CustomCheckbox from '@/components/Ui/CustomCheckbox';

const StepFour = ({ cancellationOptions, setFieldValue, values }) => {
    const [verificationSent, setVerificationSent] = useState(false);
    const [last4, setLast4] = useState("");
    const inputRef = useRef(null);
    const verifyDisabled = last4.length <= 3

    const handleChange = (e) => {
        // Allow only numbers, max 4 digits
        const value = e.target.value.replace(/\D/g, "").slice(0, 4);
        setLast4(value);
    };
    const handleSendCode = () => {
        setVerificationSent(true);
        setTimeout(() => alert('Verification code sent!'), 2000);
    };
    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
 const renderTable = () => (
  <div className="w-full bg-[#FDFDFC] shadow-md rounded-lg overflow-x-auto">
    <div className="min-w-max">
      {/* Header */}
      <div className="flex bg-[#F5F5F4] px-4 py-2">
        <div className="w-1/4 md:w-full px-4 text-sm text-[#282826] text-nowrap">Routes</div>
        <div className="w-1/4 md:w-full px-4 text-sm text-[#282826] text-nowrap ">Passengers</div>
        <div className="w-1/4 md:w-full px-4 text-sm text-[#282826] text-nowrap">Ticket number</div>
        <div className="w-1/4 md:w-full px-4 text-sm text-[#282826] text-nowrap">Price</div>
      </div>

      {/* Body */}
      <div className="px-4 py-2 w-full">
        <div className="flex py-2">
          <div className="w-1/4 md:w-full flex flex-col md:flex-row px-4  gap-2 text-sm font-semibold text-[#054E72] ">
            <span>Damascus to</span>
            <span>Dubai</span>
          </div>
          <div className="w-1/4 md:w-full px-4 text-sm text-[#054E72] font-semibold">
            MR. Mouayed Hawari
          </div>
          <div className="w-1/4 md:w-full px-4 text-sm text-[#054E72] font-semibold">
            386230452362
          </div>
          <div className="w-1/4 md:w-full px-4 text-sm font-semibold text-[#054E72]">
            900.00
          </div>
        </div>
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
                    <div className='w-full max-w-sm'>


                        <h4 className="text-lg font-semibold text-700 mb-4">Verification Required</h4>
                        <p className="text-sm mb-4 text-800">
                            Pleas enter Last 4 digits of the credit card that used for this booking.
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="w-full flex items-center">
                                <div
                                    onClick={focusInput}
                                    className="w-full max-w-md bg-gray-100 rounded-md border border-gray-200 flex items-center px-3 py-2">
                                    {/* Card Icon */}
                                    <CreditCard

                                        className="w-5 h-5 text-gray-400 mr-3" />

                                    {/* Hidden digits */}
                                    <div
                                        onClick={focusInput}

                                        className="flex space-x-4 text-gray-400">
                                        <span className="tracking-widest font-bold">••••</span>
                                        <span className="tracking-widest font-bold">••••</span>
                                        <span className="tracking-widest font-bold">••••</span>
                                    </div>

                                    {/* Input for last 4 digits */}
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={last4}
                                        onChange={handleChange}
                                        maxLength={4}
                                        className="ml-4 bg-transparent outline-none font-semibold text-gray-600 w-16 tracking-widest text-center"
                                        placeholder="XXXX"
                                    />
                                </div>
                            </div>
                            <button
                                disabled={verifyDisabled}
                                className={`px-6 py-2 text-white font-medium ${verifyDisabled ? 'bg-[#8A8A88]' : 'bg-primary-1'} rounded-md`}>Verify</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section: Refund Summary */}
            <div className="flex-[25%]">
                {/* <h3 className="text-2xl font-medium mb-6">Refund Summary</h3> */}
                <RefundSummary />
                <div className="flex my-4">
                    <CustomCheckbox
                        // checked={selectedAll}
                        // onChange={onChange}
                        label="I understand the cancellation policy and agree to the refund terms. I acknowledge that the refund amount is calculated based on
                        fare rules and cancellation fees."
                    />
                </div>
            </div>
        </div>
    );
};

export default StepFour;
[]