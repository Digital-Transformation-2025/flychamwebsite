'use client';

import { useEffect, useRef, useState } from 'react';
import { FaBars, FaGlobe, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import logo from '@/assets/images/logo.webp';
import { useRouter } from 'next/navigation';
import useIsArabic from '@/hooks/useIsArabic';
import { useTranslation } from 'react-i18next';
import { GlobeHemisphereWestIcon } from '@phosphor-icons/react';

const BottomMobileMenu = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();
  const isArabic = useIsArabic();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document[isOpen ? 'addEventListener' : 'removeEventListener']('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // useEffect(() => {
  //   document.body.style.overflow = isOpen ? 'hidden' : '';
  //   return () => { document.body.style.overflow = ''; };
  // }, [isOpen]);

  const handleLanguageToggle = () => {
    const lang = isArabic ? 'en' : 'ar';
    i18n.changeLanguage(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', lang);
    }
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen && (
        <div dir="ltr" className="fixed bottom-0 left-0 right-0 z-50 bg-main  h-16 rounded-t-2xl flex items-center justify-between px-6 shadow-xl backdrop-blur-md">
          <button
            onClick={() => setIsOpen(true)}
            className="text-white text-2xl p-2 rounded-full hover:bg-white/10 active:scale-95 transition"
          >
            <FaBars />
          </button>
          <div onClick={() => router.push(`/`)} className="relative w-20 h-6 cursor-pointer">
            <Image src={logo} alt="Logo" fill className="object-contain" />
          </div>
          <div className="w-8 h-8" />
        </div>
      )}

      <div
        ref={menuRef}
        className={`fixed bottom-0 left-0 right-0 z-[60] bg-main transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'
          } rounded-t-3xl shadow-xl backdrop-blur-md`}
      >
        {/* Fixed header */}
        <div className="sticky top-0 z-10 bg-main px-6 pt-4 pb-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-2xl p-2 rounded-full hover:bg-white/10 active:scale-95 transition"
            >
              <FaTimes />
            </button>
            <div onClick={() => router.push(`/`)} className="w-32 h-auto cursor-pointer">
              <Image src={logo} alt="Logo" className="w-full h-auto object-contain" />
            </div>
            <div className="w-8 h-8" />
          </div>
        </div>

        {/* Scrollable links */}
        <div className="overflow-y-auto max-h-[calc(100vh-80px)] px-6 py-4">
          <nav className="flex flex-col space-y-4 text-white font-medium text-sm">
            {navItems?.map((item, idx) => (
              <MenuItem t={t} key={idx} {...item} router={router} setIsOpen={setIsOpen} />
            ))}
            {/* <div
              onClick={handleLanguageToggle}
              className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
            >
              <span className="text-xl"><GlobeHemisphereWestIcon size={24}/></span>
              <span className="text-sm sm:text-base md:text-lg">
                {isArabic ? 'English' : 'العربية'}
              </span>
            </div> */}
          </nav>
        </div>
      </div>

    </>
  );
};

const MenuItem = ({ t, setIsOpen, router, link, icon: Icon, label, active = false, subLinks = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (label === t('nav.bookFlight')) {
      router.push('/');

      setTimeout(() => {
        const searchWidget = document.getElementById('search-widget');
        if (searchWidget) {
          searchWidget.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
      setIsOpen(false);
    } else if (subLinks.length > 0) {
      setIsExpanded(!isExpanded);
    } else if (link) {
      router.push(link);
      setIsOpen(false);
    }
  };


  return (
    <div>
      <div
        onClick={handleClick}
        className={`cursor-pointer flex items-center justify-between px-4 py-3 rounded-xl transition ${active ? 'bg-white text-[#075377]' : 'bg-white/10 hover:bg-white/20 text-white'
          }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl relative">
            <Icon size={24} weight={active ? 'fill' : 'bold'} />
            {label === t('nav.travelAgent') && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white shadow" />
            )}
          </span>
          <span className="text-sm sm:text-base md:text-lg">{label}</span>
        </div>
        {subLinks.length > 0 && (
          <span className="text-xl">{isExpanded ? '-' : '+'}</span>
        )}
      </div>

      {isExpanded && subLinks.length > 0 && (
        <div className="ml-8 mt-3 flex flex-col space-y-4">
          {subLinks.map((sub, subIdx) => (
            <div
              key={subIdx}
              onClick={() => {
                router.push(sub.link);
                setIsOpen(false);


              }}
              className="cursor-pointer px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-sm text-white transition"
            >
              {sub.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BottomMobileMenu;
