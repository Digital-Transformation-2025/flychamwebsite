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
            style={{
                position: 'relative',
                width: '100%',
                height: isMobile ? '200px' : '600px',
                overflow: 'hidden',
            }}
        >
            {/* Slides Wrapper */}
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
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black/40" />
                    </div>
                ))}
            </div>

            {/* Text Overlay (left/top on LTR, right/top on RTL) */}
            <div
                className={`absolute z-10 ${isArabic ? 'right-10' : 'left-10'} top-6 sm:${isArabic ? 'right-10' : 'left-10'} sm:top-10 lg:${isArabic ? 'right-14' : 'left-14'} lg:top-28 text-white`}
                style={{ maxWidth: isMobile ? '85vw' : '42rem' }}
            >
                {/* kicker */}
                <p className="text-sm sm:text-3xl font-semibold drop-shadow-md leading-tight">
                    {kicker}
                </p>

                {/* headline */}
                <h1 className="mt-2 text-4xl sm:text-6xl lg:text-9xl font-extrabold drop-shadow-md leading-none">
                    {headline}
                </h1>

                {/* price + CTA */}
                <div className={`mt-3 sm:mt-5 flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <p className="text-xs sm:text-lg font-medium drop-shadow-md">
                        {pricePrefix}{' '}
                        <span className="text-lg sm:text-2xl font-semibold text-[#d2c5a3]">{priceValue}</span>
                    </p>

                    <button
                        type="button"
                        onClick={onCtaClick}
                        className="hidden md:block rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-black"
                        style={{ backgroundColor: '#d2c5a3' }}
                    >
                        {ctaLabel}
                    </button>
                </div>
            </div>

            {/* Centered Text (kept as requested) */}
            {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 max-w-[90vw] leading-[1.2]">
          <h2 className="text-md sm:text-lg md:text-2xl lg:text-3xl font-bold mb-4 leading-[1.1]">
              {title}
          </h2>
          <h1 className="text-sm sm:text-md md:text-xl lg:text-2xl font-black leading-[1.2]">
              {subTitle}
          </h1>
      </div> */}

            {/* Navigation Dots (kept as requested) */}
            {/* {isNavigationBtns && (
        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? '10px' : '160px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '10px',
            zIndex: 20,
          }}
        >
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: index === currentSlide ? (isMobile ? '30px' : '40px') : (isMobile ? '10px' : '14px'),
                height: isMobile ? '10px' : '12px',
                borderRadius: '50px',
                backgroundColor: index === currentSlide ? '#d2c5a3' : '#fff',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      )} */}
        </div>
    );
};

export default Hero;
