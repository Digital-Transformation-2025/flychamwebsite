'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

import { FaPlaneDeparture } from 'react-icons/fa6';
import SearchTabs from '@/components/Home/SearchTabs';
import FlightSearch from '@/components/Home/FlightSearch';
import DestinationCarousel from '@/components/Home/DestinationCarousel';
import Footer from '@/components/Layout/Footer';
import uaeImage from '@/assets/images/Destenations/uae.webp';
import iraqImage from '@/assets/images/Destenations/iraq.webp';
import oman from '@/assets/images/Destenations/oman.webp';
import syria from '@/assets/images/Destenations/syria.webp';
import turkey from '@/assets/images/Destenations/turkey.webp';
import kuwait from '@/assets/images/Destenations/kuwait.webp';
import { useTranslation } from 'react-i18next';
import useIsArabic from '@/hooks/useIsArabic';
import { useRouter } from 'next/navigation';
import useIsMobile from '@/hooks/useIsMobile';
import BookingBox from '@/components/Home/BookingBox';


const DestinationCard = ({ name, description, isArabic, flights, pos }) => (
    <div
        className={`group bg-white rounded-xl p-5 shadow-lg w-full max-w-xs text-black transition hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between h-auto ${isArabic ? 'text-right' : 'text-left'}`}
        dir={isArabic ? 'rtl' : 'ltr'}
    >
        <div>
            <div className="flex items-center gap-2 mb-2">
                <FaMapMarkerAlt className="text-black" />
                <h3 className="text-[28px] font-semibold whitespace-nowrap">{name}</h3>
            </div>
            <p className="text-[12.6px] font-normal">{description}</p>
        </div>
    </div>
);





// Arrows
const NextArrow = ({ onClick }) => (
    <button onClick={onClick} className="text-white text-3xl z-10 absolute right-4 top-1/2 transform -translate-y-1/2">
        <MdArrowForwardIos />
    </button>
);
const PrevArrow = ({ onClick }) => (
    <button onClick={onClick} className="text-white text-3xl z-10 absolute left-4 top-1/2 transform -translate-y-1/2">
        <MdArrowBackIos />
    </button>
);

const DestenationClient = ({ flights, pos }) => {
    const { t } = useTranslation()
    const isArabic = useIsArabic()
    const router = useRouter()
    const isMobile = useIsMobile()
    const destinations = [
        {
            country: t('destinations.uae.country'),
            background: uaeImage,
            cities: [
                {
                    name: t('destinations.uae.sharjah.name'),
                    description: t('destinations.uae.sharjah.description'),
                },
                {
                    name: t('destinations.uae.dubai.name'),
                    description: t('destinations.uae.dubai.description'),
                },
                {
                    name: t('destinations.uae.abudhabi.name'),
                    description: t('destinations.uae.abudhabi.description'),
                },

            ],
        },
        {
            country: t('destinations.syria.country'),
            background: syria,
            cities: [
                {
                    name: t('destinations.syria.damascus.name'),
                    description: t('destinations.syria.damascus.description'),
                },
                {
                    name: t('destinations.syria.aleppo.name'),
                    description: t('destinations.syria.aleppo.description'),
                },
            ],
        },
        {
            country: t('destinations.kuwait.country'),
            background: kuwait,
            cities: [
                {
                    name: t('destinations.kuwait.kuwait.name'),
                    description: t('destinations.kuwait.kuwait.description'),
                },
            ],
        },
        {
            country: t('destinations.oman.country'),
            background: oman,
            cities: [
                {
                    name: t('destinations.oman.muscat.name'),
                    description: t('destinations.oman.muscat.description'),
                },
            ],
        },
        {
            country: t('destinations.iraq.country'),
            background: iraqImage,
            cities: [
                {
                    name: t('destinations.iraq.baghdad.name'),
                    description: t('destinations.iraq.baghdad.description'),
                },
                {
                    name: t('destinations.iraq.erbil.name'),
                    description: t('destinations.iraq.erbil.description'),
                },
            ],
        },
    ];

    const sliderRef = useRef();

    const settings = {
        infinite: true,
        speed: 2000, // 1 second transition
        cssEase: 'ease-in-out',
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, // wait 3s before next slide
        pauseOnHover: false,
        arrows: false,
    };

    const handleClickBookNow = () => {
        const searchWidget = document.getElementById('search-widget');
        if (searchWidget) {
            searchWidget.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className=" relative  min-h-screen ">
                <Slider {...settings} ref={sliderRef}>
                    {destinations.map((destination, index) => (
                        <div key={index}>
                            <div className="relative w-full h-screen">

                                <Image
                                    src={destination.background}
                                    alt={destination.country}
                                    fill
                                    className="object-cover brightness-[0.6]"
                                />

                                <div className="relative z-10 flex flex-col lg:flex-row items-start md:items-center justify-between w-full max-w-7xl mx-auto py-20 gap-8 min-h-screen">

                                    <div
                                        className={`w-full md:max-w-xl text-white px-5 md:px-4 ${isArabic ? 'text-right lg:text-right' : 'text-center lg:text-left'
                                            }`}
                                        dir={isArabic ? 'rtl' : 'ltr'}
                                    >
                                        <h1
                                            className="text-[#f5f0e6] text-[32px] sm:text-[42px] md:text-[72px] font-bold leading-tight md:leading-[63px] tracking-tight md:tracking-[0.18px] drop-shadow-lg"
                                            style={{ lineHeight: "1.2" }}
                                        >
                                            {t('hero.title')}
                                        </h1>

                                        <p className="mt-4 lg:mt-6 text-[#f5f0e6] text-[16px] sm:text-[18px] md:text-[14px] font-semibold leading-relaxed md:leading-[22px] tracking-[0.04px] drop-shadow-md">
                                            {t('hero.description')}
                                        </p>

                                        <div className={`w-full flex ${isArabic ? 'justify-start' : 'justify-center lg:justify-start'}`}>
                                            <button
                                                onClick={handleClickBookNow}
                                                className="cursor-pointer mt-6 bg-main hover:bg-[#003e61] text-white px-6 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2 transition duration-300 group"
                                            >
                                                <span className="transition-transform duration-300">{t('hero.button')}</span>
                                                <FaPlaneDeparture className="text-white text-lg transition-all duration-300" />
                                            </button>
                                        </div>
                                    </div>


                                    <div className="flex flex-col items-center gap-6 w-full md:max-w-xl">
                                        <div className=" flex items-center gap-4">
                                            <button
                                                onClick={() => sliderRef.current.slickPrev()}
                                                className="cursor-pointer text-white text-lg md:text-3xl bg-white/10 backdrop-blur-md hover:bg-white hover:text-main transition-all duration-300 p-3 rounded-full shadow-xl border border-white/20 hover:scale-110"
                                            >
                                                <MdArrowBackIos />
                                            </button>


                                            <h2 className="text-[#D9D9D9] text-[70px] md:text-[128px] font-bold  tracking-[0.32px] drop-shadow-lg">
                                                {destination.country}
                                            </h2>

                                            <button
                                                onClick={() => sliderRef.current.slickNext()}
                                                className="cursor-pointer text-white text-lg md:text-3xl bg-white/10 backdrop-blur-md hover:bg-white hover:text-main transition-all duration-300 p-3 rounded-full shadow-xl border border-white/20 hover:scale-110"
                                            >
                                                <MdArrowForwardIos />
                                            </button>
                                        </div>

                                        <div className={`flex flex-col md:flex-row ${isArabic ? 'md:flex-row-reverse' : ''} gap-6 w-full justify-center items-center md:items-stretch`}>
                                            {destination.cities.map((city) => (
                                                <DestinationCard
                                                    key={city.name}
                                                    name={city.name}
                                                    description={city.description}
                                                    isArabic={isArabic}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            {/* <div className='block xl:hidden p-8'>
                <DestinationCarousel />

            </div> */}
            <div className="p-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-2 tracking-tight text-main drop-shadow-sm">
                    Let’s Book Your Next Flight
                </h1>
                <BookingBox pos={pos} flights={flights} />

                {/* <FlightSearch isHome /> */}
            </div>

            <div className=' block xl:hidden  h-[64px]'></div>
        </>

    );
};

export default DestenationClient;
