'use client'
import BottomMobileMenu from '@/components/Layout/BottomMobileMenu'
import DestinationCards from '@/components/Home/DestinationSlider'
import FlightSearch from '@/components/Home/FlightSearch'
import Footer from '@/components/Layout/Footer'
import Hero from '@/components/Home/Hero'
import AboutFlyChamSection from '@/components/Home/OurCompanyCard'
import SideBar from '@/components/Layout/SideBar'
import useIsMobile from '@/hooks/useIsMobile'
import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation';

import DestinationCarousel from '@/components/Home/DestinationCarousel'
import Topic from '@/components/About/Topic'
import Panner from '@/components/Home/Panner'
import Help from '@/components/Home/Help'
import SectionTexts from '@/components/Ui/SectionTexts'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation';
import bg1 from '../assets/images/main-slider/bg1.webp';
import bg2 from '../assets/images/main-slider/bg2.webp';
import bg3 from '../assets/images/main-slider/bg3.webp';
import ImportantAlert from '@/components/Ui/Alert'
import BookingBox from '@/components/Home/BookingBox'
import { useDispatch, useSelector } from 'react-redux'
import { setAirports, setPos, setSearchParams } from '@/store/flightSlice'
import { getAirports, getFlightsService } from '@/store/Services/flightServices'
import { useFormik } from 'formik'
import formatDate from '@/util/formatDate'
const HomeClient = ({ flights, pos }) => {

  const dispatch = useDispatch()
  const isMobile = useIsMobile(1024);
  const router = useRouter()
  const { t } = useTranslation()
  const handleNavigate = () => {
    router.push('/destenations')
  }
  const slides = [bg1, bg2, bg3];




  return (
    <div className="transition-all duration-700">

      {/* <ImportantAlert /> */}
      <Hero slides={slides} title={t('sliderTitle')} subTitle={t('sliderDesc')} isNavigationBtns />
      <div className="">
        <div className="w-[90%] md:w-[70%] mx-auto">

          {/* <FlightSearch isHome /> */}

          <BookingBox pos={pos} flights={flights} />
        </div>
        <div className='w-[90%] mx-auto px-2'>


          <div className="mt-20 mb-20 w-[100%] justify-self-center">
            <SectionTexts
              head={t('home.destination.head')}
              desc={t('home.destination.desc')}
              btn={!isMobile === true ? t('home.destination.button') : ""}
              redirectLink="/destination"
            />
            {isMobile &&
              <>
                <DestinationCarousel />
                <button onClick={handleNavigate}
                  className="w-full xl:w-auto mt-4 xl:mt-0 cursor-pointer border border-sky-900 text-sky-900 text-sm px-4 py-2 rounded hover:bg-sky-900 hover:text-white transition"
                >
                  See All
                </button>
              </>
            }
            {!isMobile &&
              <DestinationCards handleNavigate={handleNavigate} />
            }

          </div>
          <div className="mt-20 mb-20 w-[100%] justify-self-center">
            <SectionTexts
              head={t("home.AboutTitle")}
              desc={t("home.AboutDesc")}
              btn=''
            />

            <AboutFlyChamSection />
            {/* <div className="my-20">
            <Panner />
          </div> */}

          </div>
        </div>
        {/* <div className='my-2'>
              <Help />
            </div> */}
      </div>


      {/* <BottomMobileMenu navItems={navItems} /> */}
    </div>
  )
}

export default HomeClient