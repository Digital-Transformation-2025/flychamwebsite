'use client'
import React from 'react';

const StripeBox = () => {
    const Dot = () => {
        return (
            <div className="w-5 h-5 rounded-full border-2 border-[var(--primary-1)] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary-1)]" />
            </div>
        )
    }
    const PayOnline = () => {
        return (
            <div className='flex flex-col'>

                <span className="text-base font-semibold text-black flex gap-1 items-start ">
                    <div className='block md:hidden'>

                        <Dot />
                    </div>
                    Pay online
                    {/* <img src="/strip.svg" alt= "Visa" className="h-7 w-auto" /> */}

                </span>
                <p className="text-start sm:text-left text-sm text-primary-1 font-semibold w-full sm:w-auto">
                    you will be redirected to stripe’s secure page to complete your payment
                </p>
                <div className='block sm:hidden'>
                    <PaymentIcons />
                </div>
            </div>
        )
    }
    const PaymentIcons = () => {
        return (
            <div className="flex justify-center sm:justify-end flex-1 items-center gap-2 mt-2 sm:mt-0">
                <img src="/visa.svg" alt="Visa" className="h-4 w-auto" />
                <img src="/mastercard.svg" alt="Mastercard" className="h-4 w-auto" />
                <img src="/GooglePay.svg" alt="Mastercard" className="h-4 w-auto" />
                <img src="/ApplePay.svg" alt="Amex" className="h-4 w-auto" />
                <img src="/AmericanExpress.svg" alt="Amex" className="h-4 w-auto" />
                {/* <img src="/amex.svg" alt="Amex" className="h-4 w-auto" /> */}
            </div>
        )
    }

    return (
        <div className=''>


            <div className="border border-[var(--primary-1)] max-w-xl rounded-xl p-4 flex flex-row gap-2  items-start justify-start my-3">
                <div className='flex justify-start gap-3 items-start md:items-start w-full'>

                    <div className='hidden md:block'>

                        <Dot />

                    </div>
                    <PayOnline />

                </div>

                <div className='hidden sm:block'>
                    <PaymentIcons />
                </div>
            </div>
        </div>
    );
};

export default StripeBox;
