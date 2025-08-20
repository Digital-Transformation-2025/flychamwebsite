'use client';

import React from 'react';
import Image from 'next/image';
import pattern from '@/assets/images/contact/pattern.webp';
import { MdPhone, MdOutlineMailOutline } from 'react-icons/md';
import { TbClockHour3 } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
import useIsArabic from '@/hooks/useIsArabic';

const ContactClient = () => {
  const { t } = useTranslation();
  const isArabic = useIsArabic()
  return (
    <section className="w-full min-h-screen bg-white relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-250 opacity-80 z-0 pointer-events-none" style={{
        transform: `rotate(-24deg)`,
        scale: `1.6`
      }}>
        <Image
          src={pattern}
          alt="Pattern"
          className="w-full object-contain"
        />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen">
        <h1 className="text-[42px] sm:text-[60px] md:text-[72px] lg:text-[92px] font-light text-black leading-none tracking-wide mb-6">
          {t('contact.title')}
        </h1>
        <p className="text-[16px] sm:text-[18px] text-black font-light leading-[22px] tracking-[0.04px] max-w-xl mb-10">
          {t('contact.subtitle')}
        </p>

        <div className="space-y-4">
          {/* Phone */}
          <div className="flex items-start gap-4 bg-white rounded-md px-5 py-4 shadow-md w-full max-w-md text-start">
            <MdPhone className="text-[#4C97D2] text-2xl mt-1" />
            <div>
              <div dir='ltr' className={`text-black text-lg flex ${isArabic ? 'justify-end':'justify-start'}`}>{t('contact.phone.number')}
              </div>
              <div className="text-gray-500 text-sm ">{t('contact.phone.label')}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4 bg-white rounded-md px-5 py-4 shadow-md w-full max-w-md text-start">
            <MdOutlineMailOutline className="text-[#C6A770] text-2xl mt-1" />
            <div>
              <div className="text-black text-lg">{t('contact.email.address')}
              </div>
              <div className="text-gray-500 text-sm">{t('contact.email.label')}
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-4 bg-white rounded-md px-5 py-4 shadow-md w-full max-w-md text-start">
            <TbClockHour3 className="text-[#113752] text-2xl mt-1" />
            <div>
              <div className="text-black text-lg">
                {t('contact.hours.range')}
              </div>
              <div className="text-gray-500 text-sm">{t('contact.hours.label')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactClient;
