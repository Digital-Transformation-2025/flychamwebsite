'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import logo from '@/assets/images/logo.webp'
import tabicon from '@/assets/images/tabicon.png'
import pattern from '@/assets/images/pattern.webp'
import footerPattern from '@/assets/images/footerPattern.png'
import footerPatternar from '@/assets/images/footerPatternar.png'
import sidebarar from '@/assets/images/sidebarar.png'
import arrow from "@/assets/arrow.svg"
import { useRouter } from "next/navigation"
import useIsArabic from '@/hooks/useIsArabic'
import { useTranslation } from 'react-i18next'
import SubMenu from './SubMenu'
import LanguageSwitchButton from './LanguageSwitchButton'
import logowings from "@/assets/images/logowings.png"
import logotext from "@/assets/images/logotext.png"

const SideBar = ({ navItems, isOpen, setIsOpen }) => {
    const [isManuallyControlled, setIsManuallyControlled] = useState(false)
    const router = useRouter()
    const isArabic = useIsArabic()
    const { t } = useTranslation()
    const [hoveredItem, setHoveredItem] = useState(null)

    const handleMouseEnter = () => {
        if (isManuallyControlled && !isOpen) setIsOpen(true)
    }

    const handleMouseLeave = () => {
        if (isManuallyControlled && isOpen) setIsOpen(false)
    }

    const handleArrowClick = () => {
        setTimeout(() => {
            setIsOpen(!isOpen)
            setIsManuallyControlled(isOpen)
        }, 300)
    }

    return (
        <div
            className={`relative ${isArabic ? 'right-0' : 'left-0'} h-screen bg-main text-white flex flex-col justify-between transition-all duration-1000 shadow-xl z-50 xl:pt-8`}
            style={{ width: isOpen ? '180px' : '80px' }}
        >

            {/* 🔽 Arrow toggle */}
            <div
                onClick={handleArrowClick}
                className={`absolute top-[93px] ${isArabic ? 'left-[-16px]' : 'right-[-16px]'} cursor-pointer transition-transform duration-1000`}
            >
                <Image
                    src={arrow}
                    alt="Fly Cham arrow"
                    width={28}
                    height={28}
                    className={`transition-transform duration-300 ${!isArabic ? (isOpen ? '' : 'rotate-180') : (isOpen ? 'rotate-180' : '')
                        }`}
                />
            </div>

            {/* 🔽 Pattern when open */}
  
            <div
                className={`absolute bottom-0 left-0 w-full overflow-hidden rounded-br-[16px] transition-opacity duration-500 ease-in-out`}
                style={{
                    opacity: isOpen ? 0.5 : 0,
                    transitionDelay: isOpen ? '700ms' : '0ms'
                }}
            >
                <Image
                    src={isArabic ? sidebarar : footerPattern}
                    alt="Fly Cham pattern"
                    width={250}
                    height={250}
                    className="w-full h-full"
                />
            </div>




            {/* 🔽 Top Section */}
            <div className="h-120 py-6 space-y-6">

                {/* Logo */}
                <div className="flex flex-col items-center">
                    <div className="flex gap-2">
                        <Image onClick={() => router.push(`/`)} src={logowings} alt="Fly Cham Logo" className="cursor-pointer" />
                        {isOpen && (
                            <Image onClick={() => router.push(`/`)} src={logotext} alt="Fly Cham Logo" className="cursor-pointer" />
                        )}
                    </div>
                    <div className="w-full h-[1px] bg-white/20 my-4"></div>
                </div>

                {/* Navigation */}
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <nav className="flex flex-col gap-2 mt-9 px-3">
                        {navItems.map((item, index) => (
                            <div
                                key={item.label}
                                className="relative group"
                                onMouseEnter={() => setHoveredItem(index)}
                            >
                                <button
                                    className="cursor-pointer w-full flex items-center gap-3 py-2 px-3 rounded-md text-white hover:bg-secondary hover:text-white transition font-semibold"
                                    style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', lineHeight: '15.791px' }}
                                    onClick={() => item.link && router.push(`${item.link}`)}
                                >
                                    <div className="flex gap-[2px] items-center relative mb-1">
                                        <span className="text-sm relative">
                                            <item.icon
                                                size={18}
                                                weight={hoveredItem === index ? 'fill' : 'bold'}
                                                color="white"
                                            />
                                        </span>

                                        <div
                                            className={`ml-3 text-xs whitespace-nowrap transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'opacity-100 max-w-[140px] delay-200' : 'opacity-0 max-w-0'
                                                }`}
                                        >
                                            {item.label}
                                        </div>
                                    </div>
                                </button>

                                <SubMenu
                                    subLinks={item.subLinks}
                                    isOpen={hoveredItem === index}
                                    setHoveredItem={setHoveredItem}
                                />
                            </div>
                        ))}
                    </nav>

                    {/* Language Switch Button (optional) */}
                    {/* <LanguageSwitchButton isOpen={isOpen} /> */}
                </div>
            </div>
        </div>
    )
}

export default SideBar
