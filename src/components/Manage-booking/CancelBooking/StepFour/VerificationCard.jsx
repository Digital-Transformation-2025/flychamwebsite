import React, { useRef } from 'react'
import { CreditCard } from '@phosphor-icons/react/dist/ssr';

const VerificationCard = ({ last4, focusInput,handleChange ,inputRef}) => {

    const verifyDisabled = last4.length <= 3

    return (
        <div className=" border rounded-lg p-4  md:mb-10 bg-50 border-[#F5F5F4]">
            <div className='w-full max-w-sm'>


                <h4 className="text-lg md:text-2xl font-semibold text-700 mb-6">Verification Required</h4>
                <p className="text-sm mb-4 text-800">
                    Pleas enter Last 4 digits of the credit card that used for this booking.
                </p>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-2 space-x-4">
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
    )
}

export default VerificationCard