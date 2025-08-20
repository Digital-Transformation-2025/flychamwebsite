'use client';

import React from 'react';
import Image from 'next/image';
import mission from '@/assets/images/about/mission.webp';
import mask from '@/assets/images/about/mask.webp';
import arrow from '@/assets/images/about/arrow.webp';
import { useTranslation } from 'react-i18next';

const Mission = () => {
  const { t } = useTranslation();

  return (
    <div id="mission" className="relative w-full min-h-screen flex items-start lg:items-center justify-center bg-white">
      <div className="relative w-full max-w-6xl mx-auto px-4 py-8 lg:py-16 text-[#1A2C39]">

        {/* Heading + Side Text */}
        <div className="flex flex-col lg:flex-row justify-between mb-6 w-full relative lg:absolute top-0 lg:top-[50px] z-10">
          <h2 className="text-[32px] sm:text-[40px] lg:text-[50px] leading-[1.2] font-semibold text-center lg:text-left">
            {t("mission.heading")}
          </h2>
          <p className="text-[#133343] text-[14px] font-semibold tracking-[0.98px] font-montserrat text-center lg:text-right mt-4 lg:mt-0">
            {t("mission.sideText")}
          </p>
        </div>

        {/* Mobile Image */}
        <div className="w-full mt-8 lg:hidden relative z-10">
          <Image src={mission} alt="Mission" className="w-full h-auto rounded-xl" />

          <div className="absolute bottom-2 right-2">
            <div className="bg-[#005072] p-2 rounded-full cursor-pointer shadow-md">
              <Image src={arrow} alt="arrow" width={40} height={20} />
            </div>
          </div>
        </div>

        {/* Desktop Masked Video */}
        <div className="relative overflow-hidden w-full hidden lg:block h-[410px] mt-24">
          <video
            src="/videos/ved.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{
              WebkitMaskImage: `url(${mask.src})`,
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskSize: 'cover',
              WebkitMaskPosition: 'center',
              maskImage: `url(${mask.src})`,
              maskRepeat: 'no-repeat',
              maskSize: '1000px',
              maskPosition: 'center',
            }}
          />
          <div className="absolute bottom-10 right-1">
            <div className="bg-[#005072] p-2 rounded-full cursor-pointer shadow-lg">
              <Image src={arrow} alt="arrow" width={50} height={24} />
            </div>
          </div>
        </div>

        {/* Paragraph */}
        <p className="mt-6 w-full lg:max-w-2xl text-[#133343] text-[16px] md:text-[18px] lg:text-[20px] font-[600] tracking-[0.98px] font-montserrat leading-relaxed">
          {t("mission.paragraph")}
        </p>
      </div>
    </div>
  );
};

export default Mission;
