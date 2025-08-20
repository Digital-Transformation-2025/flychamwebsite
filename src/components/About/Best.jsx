'use client';
import React from 'react';
import Image from 'next/image';
import pattern from '@/assets/images/about/pattern.webp';
import plane2 from '@/assets/images/about/plane2.webp';
import { useTranslation } from 'react-i18next';
const Best = () => {
    const { t } = useTranslation();

    return (
        <div className="relative w-full flex flex-col lg:flex-row items-end justify-between bg-white px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 md:py-20 gap-6 md:gap-8 lg:gap-10">
            {/* Left Side: Plane Image */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <img
                    src={plane2.src}
                    alt="Plane from below"
                    className="w-full h-auto max-w-[200px] sm:max-w-[260px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[700px] object-contain"
                />
            </div>
            {/* Right Side: Content */}
            <div className="w-full lg:w-1/2 flex flex-col ">
                {/* Optional Pattern Background - only on lg */}
                <div className="hidden lg:block absolute top-0 right-10% w-full  z-0">
                    <Image
                        src={pattern}
                        alt="Pattern"
                        className=""
                        placeholder="blur"
                    />
                </div>
                {/* Content */}
                <div className="relative h-100 z-10 p-2 sm:p-4 md:p-6 font-montserrat lg:backdrop-blur-sm lg:bg-black/10 lg:rounded-lg">
                    <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-snug font-semibold mb-4 sm:mb-6">
                        <span className="text-[#D0C29C] font-extrabold">{t('best.heading1')}</span>{' '}
                        <span className="text-[#2a2a2a] font-medium">{t('best.heading2')}</span>
                    </h2>
                    {/* Info Section */}
                    <div className="flex flex-col lg:flex-row justify-between gap-4 sm:gap-6">
                        {/* Left Block */}
                        <div className="flex-1">
                            <p className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-[#2a2a2a] leading-tight font-medium">
                            {t('best.comfort')}<span className="text-[#BAA981] font-semibold">  {t('best.businessClass')}</span>
                            </p>
                            <button className="mt-3 sm:mt-4 bg-[#2a2a2a] text-white text-xs sm:text-sm px-4 sm:px-6 py-2 rounded-md font-medium shadow hover:bg-[#07394f] transition">
                           {t('best.bookNow')}
                            </button>
                        </div>
                        {/* Right Block */}
                        <div className="flex-1 space-y-4 sm:space-y-6 text-[#2a2a2a] text-xs sm:text-sm font-medium mt-3 sm:mt-4 lg:mt-0">
                            <div>
                                <p>{t('best.loyalty.title')}</p>
                                <p className="text-[#BAA981] text-[12px] sm:text-[14px]">{t('best.loyalty.coming')}</p>
                            </div>
                            <div>
                                <p>{t('best.trip.title')}</p>
                                <p className="text-[#BAA981] text-[12px] sm:text-[14px]">{t('best.loyalty.coming')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Best;