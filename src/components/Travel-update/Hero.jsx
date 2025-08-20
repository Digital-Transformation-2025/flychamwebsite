'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import useIsArabic from '@/hooks/useIsArabic';

const Hero = ({ slides, isNavigationBtns, title, country, subTitle, objectFit = 'cover', height = 'responsive', parentHeight = 'responsive' }) => {
  const { t, i18n } = useTranslation();
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
      className={`relative w-full overflow-hidden ${parentHeight === 'responsive' ? 'h-[250px] md:h-[400px] lg:h-[500px]' : ''
        }`}
      style={{
        height: parentHeight !== 'responsive' ? parentHeight : undefined,
        backgroundColor: objectFit === 'contain' ? '#000' : 'transparent', // prevent white space
      }}
    >

      {/* Slides */}
      <div
        className={`flex transition-transform duration-800 ease-in-out w-full`}
        style={{
          transform: isArabic
            ? `translateX(${currentSlide * 100}%)`
            : `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((image, index) => (
          <div
            key={index}
            className={`min-w-full flex-shrink-0 relative ${height === 'responsive' ? 'h-[250px] md:h-[400px] lg:h-[500px]' : ''
              }`}
            style={height !== 'responsive' ? { height } : {}}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              className={`object-${objectFit}`}
              priority={index === 0}
            />

            {/* Black overlay (half opacity) */}
            <div className="absolute inset-0 bg-[#e8e0c447]"></div>
          </div>
        ))}
      </div>


      {/* Center Text */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center z-10 max-w-[90vw] px-4">
  <h2
    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-4 leading-tight"
    style={{
      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
    }}
  >
    {t(title)}
  </h2>

  <h2
    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight"
    style={{
      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
    }}
  >
    {t(country)}
  </h2>

  {subTitle && (
    <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-[#F5F5F4] font-medium font-[Montserrat] leading-normal">
      {t(subTitle)}
    </p>
  )}
</div>


      {/* Navigation Dots */}
      {isNavigationBtns && (
        <div className="absolute bottom-10 md:bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer transition-all duration-300 ${index === currentSlide ? 'w-10 bg-[#d2c5a3]' : 'w-4 bg-white'
                } h-4 rounded-full`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;
