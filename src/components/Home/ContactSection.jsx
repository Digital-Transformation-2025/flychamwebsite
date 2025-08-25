'use client';

import React from 'react';
import { MdPhone, MdOutlineMailOutline } from 'react-icons/md';
import { TbClockHour3 } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
import useIsArabic from '@/hooks/useIsArabic';

const ContactSection = () => {
  const { t } = useTranslation();
  const isArabic = useIsArabic();

  return (
    <section className="w-full bg-white py-16">
      <div className="w-[90%] mx-auto flex flex-col items-center text-center space-y-4">
        <h2 className="text-3xl sm:text-5xl font-light text-black">
          {t('contact.title')}
        </h2>
        <p className="text-base text-black font-light max-w-xl">
          {t('contact.subtitle')}
        </p>
        <div className="mt-8 space-y-4 w-full max-w-md">
          <div className="flex items-start gap-4 bg-white rounded-md px-5 py-4 shadow-md text-start">
            <MdPhone className="text-[#4C97D2] text-2xl mt-1" />
            <div>
              <div dir='ltr' className={`text-black text-lg flex ${isArabic ? 'justify-end' : 'justify-start'}`}>
                {t('contact.phone.number')}
              </div>
              <div className="text-gray-500 text-sm">{t('contact.phone.label')}</div>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white rounded-md px-5 py-4 shadow-md text-start">
            <MdOutlineMailOutline className="text-[#C6A770] text-2xl mt-1" />
            <div>
              <div className="text-black text-lg">{t('contact.email.address')}</div>
              <div className="text-gray-500 text-sm">{t('contact.email.label')}</div>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white rounded-md px-5 py-4 shadow-md text-start">
            <TbClockHour3 className="text-[#113752] text-2xl mt-1" />
            <div>
              <div className="text-black text-lg">{t('contact.hours.range')}</div>
              <div className="text-gray-500 text-sm">{t('contact.hours.label')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

