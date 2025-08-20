'use client';
import { useState } from 'react';
import { GlobeHemisphereWestIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import useIsArabic from '@/hooks/useIsArabic';

const LanguageSwitchButton = ({ isOpen }) => {
  const { i18n } = useTranslation();
  const isArabic = useIsArabic();
  const [isHovered, setIsHovered] = useState(false);

  const handleLanguageToggle = () => {
    const langCode = isArabic ? 'en' : 'ar';
    i18n.changeLanguage(langCode);
    const dir = langCode === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', langCode);
  };

  return (
    <button
      className="w-full flex items-center gap-3 py-2 px-3 rounded-md text-white hover:bg-secondary transition font-semibold"
      style={{
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '15px',
        fontStyle: 'normal',
        lineHeight: '15.791px',
      }}
      onClick={handleLanguageToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-2 items-center relative">
        <span className="text-lg relative">
          <GlobeHemisphereWestIcon
            color="white"
            size={24}
            weight={isHovered ? 'fill' : 'regular'}
          />
        </span>
        <span
          className={`ml-3 whitespace-nowrap transition-all duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
          }`}
        >
          {isArabic ? 'English' : 'العربية'}
        </span>
      </div>
    </button>
  );
};

export default LanguageSwitchButton;
