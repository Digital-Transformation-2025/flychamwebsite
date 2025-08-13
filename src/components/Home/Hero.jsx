'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { useTranslation } from 'react-i18next';
import useIsArabic from '@/hooks/useIsArabic';
import useIsMobile from '@/hooks/useIsMobile';

const Hero = ({ slides, isNavigationBtns, title, subTitle }) => {
    const { t, i18n } = useTranslation();
    const isMobile = useIsMobile()
    const [currentSlide, setCurrentSlide] = useState(0);
    const isArabic = useIsArabic();
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(intervalRef.current);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: isMobile ? '150px' : '600px',
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
      className={`w-screen relative flex-shrink-0 ${isMobile ? 'h-[200px]' : 'h-[600px]'}`}
    >
      <Image
        src={image}
        alt={`Slide ${index + 1}`}
        fill
        className="object-cover"
        priority={index === 0}
      />
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  ))}
</div>


            {/* Centered Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 max-w-[90vw] leading-[1.2]">
                <h2 className="text-md sm:text-lg md:text-2xl lg:text-3xl font-bold mb-4 leading-[1.1]">
                    {title}
                </h2>
                <h1 className="text-sm sm:text-md md:text-xl lg:text-2xl font-black leading-[1.2]">
                    {subTitle}
                </h1>
            </div>


            {/* Navigation Dots */}
            {isNavigationBtns &&

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
                                width: index === currentSlide ? (isMobile ? '30px':'40px') :  (isMobile ? '10px':'14px'),
                                height: isMobile ? '10px':"12px",
                                borderRadius: '50px',
                                backgroundColor: index === currentSlide ? '#d2c5a3' : '#fff',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                        />
                    ))}
                </div>
            }
        </div>
    );
};

export default Hero;
