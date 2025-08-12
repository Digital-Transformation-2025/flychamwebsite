'use client';
import useIsMobile from '@/hooks/useIsMobile';
import formatPrice from '@/util/formatePrice';
import React from 'react';

const FareCard = ({ isMissingPlan, type, price, special, isLg, currecny, isConfirmed }) => {
    const isEconomy = type === 'Economy';
    const isMobile = !useIsMobile(1100)
    console.log('isMobile', !isMobile);

    const bg = isEconomy ? `${isMobile ? "bg-[rgba(var(--primary-1-rgb),0.2)]" : "bg-[rgba(var(--primary-1-rgb),0.1)]"}` : 'bg-primary-1';
    const border = isMobile && (isEconomy ? ' border border-[rgba(var(--primary-1-rgb),0.5)]' : ' border border-[var(--primary-1)]')

    const textMobile = isEconomy ? 'text-primary-1' : 'text-white';
    const textDesktop = isEconomy ? 'text-primary-1 lg:!text-black' : 'text-white lg:text-black'

    const amount = isConfirmed ? price : formatPrice(price?.split?.('.')[0]) || '';
    const currency = currecny || '';

    return (
        <div className={` ${border} rounded-xl overflow-hidden w-full lg:w-[175px] h-fit lg:h-[141px] flex flex-col`}>

            {/* Header */}
            <div className={`${bg} ${textMobile} text-[12px] lg:text-sm font-semibold ${(!isMissingPlan && !isMobile) ? 'text-start' : 'text-center'}  p-2 lg:p-1`}>
                {type}
            </div>

            {/* Body */}
            <div className={`${isLg ? bg : 'bg-white'} flex flex-row lg:flex-col gap-1 lg:gap-0 items-center  flex-1 ${(!isMissingPlan && !isMobile) ? 'justify-start' : 'justify-center'} p-2 lg:p-1`}>
                {price ? (
                    <>
                        {/* Mobile */}
                        <div className=" block lg:hidden text-[12px]">
                            <div className={`${textMobile} font-semibold`}>{currency}</div>
                            <div className={`${textMobile} text-[16px]`}>{amount}</div>
                        </div>

                        {/* Desktop */}
                        <div className="hidden lg:block text-[12px]">
                            <div className={`${textDesktop} font-semibold`}>{`From ${currency}`}</div>
                            <div className={` ${textDesktop} text-[26px]`}>{amount}</div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-[#5F5F5C] text-base">Not available</div>
                        {special && <div className="text-[#8E6B17] text-xs mt-1">Special deal</div>}
                    </>
                )}
            </div>
        </div>
    );
};

export default FareCard;
