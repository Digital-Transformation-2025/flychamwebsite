import React, { useRef } from 'react'
import { CreditCard } from '@phosphor-icons/react/dist/ssr';
import { useSelector } from 'react-redux';
import VerificationSuccess from './VerificationSuccess';
import ErrorMessage from '@/components/Ui/ErrorMessage';

const VerificationCard = ({ last4, focusInput, handleChange, inputRef, handleSubmit, isVerified, isSubmitted }) => {
    const { isLoadingVerifyCard } = useSelector((s) => s.manageBook)
    const isError = !isVerified && isSubmitted
    const verifyDisabled = (last4.length <= 3 || isLoadingVerifyCard)

    return (
        <div className=" border rounded-lg p-4  md:mb-10 bg-50 border-[#F5F5F4]">
            <div className='w-full max-w-sm'>


                <h4 className="text-lg md:text-2xl font-semibold text-700 mb-6">Verification Required</h4>
                {isVerified ?

                    <VerificationSuccess />
                    :
                    <>
                        <p className="text-sm mb-4 text-800">
                            Pleas enter Last 4 digits of the credit card that used for this booking.
                        </p>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-2 space-x-4">
                            <div className="w-full flex items-center">
                                <div
                                    onClick={focusInput}
                                    className={`w-full max-w-2xs md:max-w-md bg-gray-100 rounded-md border ${isError ? 'border-alert' : 'border-[#E5E5E3]'} flex items-center px-3 py-2`}>

                                    <CreditCard

                                        className={`w-5 h-5 ${isError ? 'text-alert' : 'text-400'} mr-3`} />

                                    <div onClick={focusInput} className={`flex space-x-4 ${isError ? 'text-alert' : 'text-gray-400'}`}>
                                        {Array(3).fill("••••").map((dots, i) => (
                                            <span key={i} className="tracking-widest font-bold">
                                                {dots}
                                            </span>
                                        ))}
                                    </div>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={last4}
                                        onChange={handleChange}
                                        maxLength={4}
                                        className={`ml-4 bg-transparent  outline-none font-semibold ${isError ? 'text-alert' : 'text-primary-1'} 
                                        w-16 tracking-widest text-center`}
                                        placeholder="XXXX"
                                    />
                                </div>
                            </div>
                            <button
                                disabled={verifyDisabled}
                                onClick={handleSubmit}
                                className={`px-6 py-2 text-white text-nowrap font-medium ${verifyDisabled ? 'bg-[#8A8A88]' : 'bg-primary-1'} rounded-md`}>
                                {isLoadingVerifyCard ? 'Processing ...' : 'Verify'}

                            </button>
                        </div>
                        {isError
                            &&
                            <ErrorMessage error="Invalid digits. Please recheck your card number." />
                        }

                    </>
                }
            </div>
        </div>
    )
}

export default VerificationCard