'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { InfoIcon, XIcon } from '@phosphor-icons/react';
import useIsArabic from '@/hooks/useIsArabic';

export default function ImportantAlert() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const isArabic = useIsArabic();

  const alerts = [
    t('travelCard.update'),
    // t('travelCard.titleUAE'),
    // t('travelCard.titleMuscat'),
    // t('travelCard.titleIraq'),
    // t('travelCard.titleKuwait')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % alerts.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [alerts.length]);
  const currentAlert = alerts[currentIndex];

  const dynamicHeight = currentAlert.length > 40 ? 'h-[4em]' : 'h-[1.8em]';

  if (!isVisible) return null;

  return (
    <div className="w-full z-50 bg-secondary-light shadow px-4 md:px-6 py-2 flex items-center justify-between">
      {/* Left - Icon + Title */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <InfoIcon size={20} weight="bold" className="text-main" />
        <span className="text-[15.959px] text-main font-semibold">
          {t('alert.important')}
        </span>
      </div>

      {/* Middle - Alert */}
      <div
        className={`flex-1 mx-4 relative ${dynamicHeight} md:h-[1.8em]`}
      >
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 right-0 transition-transform duration-500 ${isArabic ? 'text-right' : 'text-left'} ${index === currentIndex ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
              }`}
            style={{
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              whiteSpace: 'normal',
              lineHeight: '1.5',
              fontSize: '15.959px',
              color: '#000',
              cursor: 'pointer',
              textDecoration: 'underline',
              textUnderlineOffset: '2px'
            }}
            onClick={() => {
              router.push('/travel-update');
            }}
          >
            {alert}
          </div>
        ))}
      </div>

      {/* Right - Close */}
      <button
        onClick={() => setIsVisible(false)}
        className="text-main hover:text-black transition cursor-pointer flex-shrink-0"
        aria-label="Close Alert"
      >
        <XIcon size={20} weight="bold" />
      </button>
    </div>
  );
}
