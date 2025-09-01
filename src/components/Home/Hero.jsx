'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import useIsArabic from '@/hooks/useIsArabic';
import useIsMobile from '@/hooks/useIsMobile';

const Hero = ({
    slides,
    isNavigationBtns,
    kicker = 'Discover our new destination',
    headline = 'Mersin',
    pricePrefix = 'Starting from',
    priceValue = '159 USD',
    ctaLabel = 'Book now',
    onCtaClick,
    // legacy (unused here, kept to preserve your API)
    title,
    subTitle,
}) => {
    const { t } = useTranslation();
    const isMobile = useIsMobile();
    const isArabic = useIsArabic();

    const [currentSlide, setCurrentSlide] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [slides.length]);

    const goToSlide = (index) => setCurrentSlide(index);

    return (
        <div
            className="grid grid-rows-1 grid-cols-1 overflow-hidden"
            style={{ height: isMobile ? '200px' : '600px' }}
        >
            {/* Slides layer */}
            <div className="col-start-1 row-start-1">
                <div
                    className="flex transition-transform duration-[800ms] ease-in-out"
                    style={{
                        width: `${slides.length * 100}vw`,
                        transform: isArabic
                            ? `translateX(${currentSlide * 100}vw)` // RTL
                            : `translateX(-${currentSlide * 100}vw)`, // LTR
                    }}
                >
                    {slides.map((image, index) => (
                        <div
                            key={index}
                            className={`w-screen relative flex-shrink-0 ${isMobile ? 'h-[200px]' : 'h-[600px]'
                                }`}
                        >
                            <Image
                                src={image}
                                alt={`Slide ${index + 1}`}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Gradient overlay layer (no absolute) */}
            <div className="col-start-1 row-start-1 w-full h-full bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            {/* Text layer (no absolute) */}
            <div className='w-full max-w-7xl mx-auto col-start-1 mb-10 md:mb-50 px-4'>


                <div
                    className={[
                        'text-white',
                        isArabic ? 'text-right' : 'text-left',
                        // >>> SAME CONTAINER AS BOOKING BOX <<<

                    ].join(' ')}
                >
                    {/* kicker */}
                    <p className="text-lg sm:text-2xl font-semibold drop-shadow-md leading-tight">
                        {kicker}
                    </p>

                    {/* headline */}
                    <h1 className="mt-2 text-4xl sm:text-6xl lg:text-9xl font-extrabold drop-shadow-md leading-none">
                        {headline}
                    </h1>

                    {/* price + CTA */}
                    <div
                        className={`mt-3 sm:mt-5 flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''
                            }`}
                    >
                        <p className="text-xs sm:text-lg font-medium drop-shadow-md">
                            {pricePrefix}{' '}
                            <span className="text-lg sm:text-2xl font-semibold text-[#d2c5a3]">
                                {priceValue}
                            </span>
                        </p>

                        <button
                            type="button"
                            onClick={onCtaClick}
                            className="rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-black"
                            style={{ backgroundColor: '#d2c5a3' }}
                        >
                            {ctaLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
