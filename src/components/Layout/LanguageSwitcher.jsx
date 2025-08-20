'use client'
import React, { useState } from 'react'
import { FaGlobe } from 'react-icons/fa'
import { IoIosArrowDown, IoIosCheckmark } from 'react-icons/io'
import { useTranslation } from 'react-i18next'
import useIsArabic from '@/hooks/useIsArabic'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const isArabic = useIsArabic();


  const currentLang = i18n.language === 'ar' ? 'Arabic' : 'English'

  const toggleDropdown = () => setIsOpen(!isOpen)

   const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode)
    setIsOpen(false)

    if (typeof document !== 'undefined') {
      const dir = langCode === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.setAttribute('dir', dir)
      document.documentElement.setAttribute('lang', langCode)
    }
  }


  return (
    <div className={`absolute top-4 ${isArabic ? 'left-4':'right-4'} z-50`}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-4 py-2 text-white shadow-md"
        style={{
          borderRadius: '74px',
          background: 'rgba(108, 134, 177, 0.20)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
        }}
      >
        <FaGlobe className="text-[#00507A]" size={20} />
        <span>{currentLang}</span>
        <IoIosArrowDown />
      </button>

      {isOpen && (
        <div className="mt-2 w-32 bg-[#5a5a5a] rounded-md p-2 text-sm text-white shadow-lg">
          <div
            className="flex justify-between items-center px-2 py-1 cursor-pointer hover:bg-[#444]"
            onClick={() => changeLanguage('ar')}
          >
            <span className={currentLang === 'Arabic' ? 'text-[#f3e2b4]' : ''}>Arabic</span>
            {currentLang === 'Arabic' && <IoIosCheckmark className="text-[#f3e2b4]" />}
          </div>
          <div
            className="flex justify-between items-center px-2 py-1 cursor-pointer hover:bg-[#444]"
            onClick={() => changeLanguage('en')}
          >
            <span className={currentLang === 'English' ? 'text-[#00507A]' : ''}>English</span>
            {currentLang === 'English' && <IoIosCheckmark className="text-[#00507A]" />}
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
