'use client';

import React from 'react';
import Link from 'next/link';
import { Info } from '@phosphor-icons/react';

const TravelCard = ({ update, isFindMore }) => {
    return (
        <div className="relative w-full rounded-lg border border-gray-200 shadow-md overflow-hidden">
            {/* Header */}
            <div className="flex">
                <div className=" bg-main w-2 md:w-2"></div>
                <div className="flex-1">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-[#f5ebd8] px-4 py-3">
                        <div className="flex items-center space-x-2">
                            <Info size={20} color="#26485B" />
                            <span className="text-sm font-medium text-main">
                                {update.label}
                            </span>
                        </div>
                        <div className="text-[13.96px] text-[#5F5F5C] font-normal word-break break-words">
                            {update.date}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex">
                        <div className="flex-1 px-6 py-4">
                            <h2
                                className="text-[27.93px] font-semibold text-main mb-5 md:mb-2 word-break break-words"
                                style={{ lineHeight: '1.2' }}
                            >
                                {update.title}
                            </h2>

                  <p className="text-[13.96px] text-main font-normal leading-[2] md:leading-[1.8] mb-4 break-words">
  {update.description}{' '}
  <span className="font-semibold italic underline text-main cursor-pointer">
    {update.linkText}
  </span>{' '}
  {update.moreText}{' '}
  <Link href={`/contact`} className="font-semibold italic underline text-main cursor-pointer">
    {update.contactText}
  </Link>
</p>

                            {isFindMore &&
                                <Link href={`/travel-update/${update.slug}`}>
                                    <button
                                        type="button"
                                        className="inline-flex px-[23.94px] py-[8px] bg-main rounded-[5.98px] justify-center items-center gap-[9.97px] text-[#F5F5F4] text-[14px] font-bold cursor-pointer hover:bg-main transition-colors"
                                    >
                                        {update.buttonText}
                                    </button>
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelCard;
