'use client';
import useIsArabic from '@/hooks/useIsArabic';
import { AirplaneTilt, ArrowLeft, ArrowRightIcon, Clock } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export const TravelUpdateDetail = ({ slug }) => {
  const { t } = useTranslation();
  const isArabic = useIsArabic()
  const router = useRouter()
  const titleMap = {
    'flight-suspension-uae': t('travelCard.titleUAE'),
    'flight-suspension-kuwait': t('travelCard.titleKuwait'),
    'flight-suspension-iraq': t('travelCard.titleIraq'),
    'flight-suspension-muscat': t('travelCard.titleMuscat')
  };
  const SuspendedRoutesCard = ({ slug }) => {
    const { t } = useTranslation();

    const routeMap = {
      'flight-suspension-uae': [
        { route: t('travelUpdate.suspendedRoute1'), date: t('travelUpdate.suspendedRoute1Date') }
      ],
      'flight-suspension-kuwait': [
        { route: t('travelUpdate.suspendedRoute2'), date: t('travelUpdate.suspendedRoute2Date') }
      ],
      'flight-suspension-iraq': [
        { route: t('travelUpdate.suspendedRoute4'), date: t('travelUpdate.suspendedRoute4Date') }
      ],
      'flight-suspension-muscat': [
        { route: t('travelUpdate.suspendedRoute3'), date: t('travelUpdate.suspendedRoute3Date') }
      ]
    };

    const routes = routeMap[slug] || [];

    return (
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Left Card */}
        <div className="flex-1 bg-[#F5F5F5] p-6 rounded-xl">
          <h3 className="text-xl md:text-2xl text-[#1B1F23] font-semibold mb-4">
            {t('travelUpdate.suspendedRoutesTitle')}
          </h3>

          <ul className="space-y-4 text-[#1B1F23] text-[16px] leading-6">
            {routes.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <AirplaneTilt size={20} color="#054E72" className={`mt-1 ${isArabic ? 'rotate-270' : ''}`}
                />
                <div>
                  <div>{item.route}</div>
                  <div className="text-[#5F5F5C] text-[15px] mt-1 ml-5">
                    {item.date}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Card */}
        <div className="flex-1 bg-[#FEF6E7] p-6 rounded-xl border border-[#F5E6C8]">
          <h3 className="text-[20px] text-[#1B1F23] font-semibold mb-4">
            {t('travelUpdate.importantNoticeTitle')}
          </h3>

          <p className="text-[#1B1F23] text-[16px] leading-6">
            {t('travelUpdate.importantNoticeText')}
          </p>
        </div>
      </div>
    );
  };




  const FlexibleOptionsNotice = () => {
    const { t, i18n } = useTranslation();
    const isArabic = useIsArabic();

    const options = t('travelUpdate.flexibleOptions', { returnObjects: true });

    return (
      <div className="mb-8">
        <p className="text-[#054E72] text-[18px] font-medium mb-4">
          {t('travelUpdate.flexibleOptionsIntro')}
        </p>
        <ul className="pl-5 space-y-2 text-[#000] text-[16px] leading-[24px]">
          {options.map((item, index) => (
            <li
              key={index}
              className={`relative before:content-['-'] before:absolute ${isArabic ? 'before:right-0 pr-4' : 'before:left-0 pl-4'
                } before:text-[#000]`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const ActionButtons = () => {
    const { t } = useTranslation();
    const buttons = [
      t('travelUpdate.buttonCheckStatus'),
      t('travelUpdate.buttonManageBooking'),
      t('travelUpdate.buttonContactUs'),
    ];
    const handleClick = (label) => {
      
      if (label === t('travelUpdate.buttonContactUs')) {
        router.push('/contact')
      }
    }
    return (
      <div className="flex flex-col md:flex-row gap-6 md:gap-3">
        {buttons.map((label, index) => (
<button
  key={index}
  onClick={() => handleClick(label)}
  className="
    cursor-pointer flex-1 px-6 py-3 border border-main font-bold text-[14px] transition rounded-md
    bg-transparent text-main
    hover:bg-main hover:!text-white
    active:!bg-main active:!text-white
  "
>
  {label}
</button>

        ))}
      </div>
    );
  };


  const WhatYouNeedToKnow = () => {
    return (
      <div className="mb-8">
        <h2 className="text-[24px] text-[#1B1F23] font-semibold mb-4">
          {t('travelUpdate.whatYouNeedToKnow')}
        </h2>

        <div className="mb-6">
          <h3 className="text-[18px] text-[#282826] font-medium mb-2">
            {t('travelUpdate.rebookingProcessTitle')}
          </h3>
          <p className="text-[#3E3E3B] text-[16px] leading-6">
            {t('travelUpdate.rebookingProcessText')}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-[18px] text-[#282826] font-medium mb-2">
            {t('travelUpdate.flightStatusUpdatesTitle')}
          </h3>
          <p className="text-[#3E3E3B] text-[16px] leading-6">
            {t('travelUpdate.flightStatusUpdatesText')}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mx-auto px-2 py-4">
      <div className="mb-6">
        {/* Back button */}
        {/* <button
          onClick={() => router.back()}
          className="cursor-pointer flex items-center gap-1 text-main-light font-semibold text-[14px] hover:underline"
        >
          {isArabic ?

            <ArrowRightIcon size={15} weight="bold" />
            :

            <ArrowLeft size={15} weight="bold" />
          }
          {t('Back')}
        </button> */}

<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-main font-bold mb-1">
  {titleMap[slug] || t('travelUpdate.pageTitle')}
</h1>

<div className="flex items-center text-sm sm:text-base md:text-lg text-[#5F5F5C] mb-6">
  <Clock size={20} color="#5F5F5C" className="mr-2" />
  {t('travelUpdate.lastUpdated')}
</div>

<h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-secondary font-semibold mb-4">
  {t('travelUpdate.overviewTitle')}
</h2>


        <SuspendedRoutesCard slug={slug} />
        <FlexibleOptionsNotice />
        <WhatYouNeedToKnow />
        <ActionButtons />
      </div>
    </div>
  );
};
