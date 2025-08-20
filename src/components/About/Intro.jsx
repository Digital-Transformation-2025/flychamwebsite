'use client';
import React from 'react';
import Image from 'next/image';
import bg from '@/assets/images/about/bg.webp';
import { CiDesktopMouse1 } from 'react-icons/ci';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaWhatsapp, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { PiThreadsLogo } from 'react-icons/pi';

const Intro = ({ scrollToNext }) => {
  const { t } = useTranslation()
  return (
    <div className="relative w-full min-h-screen text-white z-40 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bg}
          alt="Background"
          fill
          className="object-cover object-center scale-105 transition-transform duration-700 hover:scale-110"
          priority
        />
      </div>

      {/* White Blur Overlay */}
      <div className="absolute inset-0 z-10 bg-white/15 backdrop-blur-sm"></div>

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 z-15 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>

      {/* Subtle animated overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-tr from-blue-900/10 via-transparent to-blue-800/5 animate-pulse"></div>

      {/* Content Container */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">

          {/* Main Title - Larger hierarchy */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight text-white tracking-tight leading-none">
              {t("intro.title")
              }            </h1>
          </div>

          {/* Decorative Line */}
          <div className="w-24 sm:w-32 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto"></div>

          {/* Subtitle/Description - Better hierarchy */}
{/* Contact / Social Links */}
<div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
  <p className="text-white/80 text-base sm:text-lg font-light">
    {t("intro.followUs")} {/* Example: "Follow us on social media" */}
  </p>
<div className="flex justify-center flex-wrap gap-3 sm:gap-5 pt-2">
  {[
    {
      icon: <PiThreadsLogo size={20} />,
      url: 'https://www.threads.com/@fly.cham',
    },
    {
      icon: <FaInstagram size={20} />,
      url: 'https://www.instagram.com/fly.cham/',
    },
    {
      icon: <FaFacebookF size={20} />,
      url: 'https://www.facebook.com/people/%D9%81%D9%84%D8%A7%D9%8A-%D8%B4%D8%A7%D9%85-Fly-Cham/61575817032233/',
    },
    {
      icon: <FaLinkedinIn size={20} />,
      url: 'https://www.linkedin.com/company/fly-cham/',
    },
    {
      icon: <FaXTwitter size={20} />,
      url: 'https://x.com/fly_cham',
    },
    {
      icon: <FaWhatsapp size={20} />,
      url: 'https://wa.me/97141234567',
    },
  ].map((item, index) => (
    <div
      key={index}
      onClick={() => window.open(item.url, '_blank')}
      className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border border-[#D6B680] text-[#D6B680] hover:opacity-80 transition"
    >
      {item.icon}
    </div>
  ))}
</div>
  <p className="text-white/80 text-base sm:text-lg font-light">
    {t("intro.orContactUs")} {/* Example: "or contact us via call center" */}
  </p>

  <p dir='ltr' className="text-white text-lg sm:text-xl font-semibold">
    +971 4 123 4567
  </p>


</div>

          {/* Modern CTA Button */}
          {/* <div className="pt-4 sm:pt-6 lg:pt-8">
            <button
              onClick={scrollToNext}
              className="group relative inline-flex items-center justify-center gap-3 text-white text-sm sm:text-base font-medium px-8 sm:px-10 py-3 sm:py-4 rounded-full transition-all duration-500 hover:scale-105 transform hover:-translate-y-1 backdrop-blur-md border border-white/20 hover:border-white/40 shadow-2xl hover:shadow-blue-500/25"
              style={{
                background: 'linear-gradient(135deg, rgba(5, 78, 114, 0.8) 0%, rgba(3, 97, 143, 0.9) 100%)',
              }}
            >
              <span className="relative z-10">{t("intro.button")
              }</span>
              <CiDesktopMouse1 className="text-lg sm:text-xl transition-transform duration-300 group-hover:translate-y-1" />

              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            </button>
          </div> */}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-200/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-white/15 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-100/25 rounded-full animate-ping delay-500"></div>
      </div>
    </div>
  );
};

export default Intro;