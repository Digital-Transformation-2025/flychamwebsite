'use client';

import React from 'react';
import Image from 'next/image';
import logo from '@/assets/images/logo.webp';
import {
    FaInstagram, FaTiktok, FaYoutube, FaFacebookF, FaLinkedinIn, FaTelegramPlane
} from 'react-icons/fa';
import {
    PiThreadsLogo
} from 'react-icons/pi';
import { FaXTwitter } from "react-icons/fa6";
import pattern from '@/assets/images/pattern.webp';
import footerPattern from '@/assets/images/footerPattern.png';
import sidebarar from '@/assets/images/sidebarar.png';
import { useTranslation } from 'react-i18next';
import useIsArabic from '@/hooks/useIsArabic';
const Footer = () => {
    const { t } = useTranslation();
    const isArabic = useIsArabic()

    const sections = [
        {
            title: t('footer.aboutFlyCham.title'),
            links: [
                t('footer.aboutFlyCham.links.ourStory'),
                t('footer.aboutFlyCham.links.ourMission'),
                t('footer.aboutFlyCham.links.ourVision'),
                t('footer.aboutFlyCham.links.ourValues'),
                t('footer.aboutFlyCham.links.ourResponsibility'),
                t('footer.aboutFlyCham.links.ourFleet'),
                t('footer.aboutFlyCham.links.mediaCenter'),
                t('footer.aboutFlyCham.links.chairmanMessage'),
            ]
        },
        {
            title: t('footer.bookFlights.title'),
            links: [
                t('footer.bookFlights.links.searchFlight'),
                t('footer.bookFlights.links.flightSchedules'),
                t('footer.bookFlights.links.hotelBooking'),
                t('footer.bookFlights.links.carRental'),
                t('footer.bookFlights.links.visaInfo'),
                t('footer.bookFlights.links.groupTravel'),
                t('footer.bookFlights.links.privateFlights'),
            ]
        },
        {
            title: t('footer.destinations.title'),
            links: [
                t('footer.destinations.links.domestic'),
                t('footer.destinations.links.international'),
                t('footer.destinations.links.indirect'),
                t('footer.destinations.links.holidays'),
                t('footer.destinations.links.discoverSyria'),
                t('footer.destinations.links.tourismPrograms'),
                t('footer.destinations.links.familyPackages'),
                t('footer.destinations.links.honeymoonPackages'),
            ]
        },
        {
            title: t('footer.loyaltyProgram.title'),
            links: [
                t('footer.loyaltyProgram.links.about'),
                t('footer.loyaltyProgram.links.join'),
                t('footer.loyaltyProgram.links.terms'),
            ]
        },
        {
            title: t('footer.travelExperience.title'),
            links: [
                t('footer.travelExperience.links.beforeTravel'),
                t('footer.travelExperience.links.atAirport'),
                t('footer.travelExperience.links.onBoard'),
                t('footer.travelExperience.links.additionalServices'),
            ]
        },
        {
            title: t('footer.help.title'),
            links: [
                t('footer.help.links.travelUpdates'),
                t('footer.help.links.share'),
                t('footer.help.links.faq'),
                t('footer.help.links.contact'),
                t('footer.help.links.ouroffice'),
                t('footer.help.links.ourgsa'),
                t('footer.help.links.travelhub'),
                t('footer.help.links.apiintegration'),
                t('footer.help.links.travelAgentGuide'),

            ]
        }
    ];


    return (
        <div className=" relative  bg-main text-white">
            <footer className=" w-[90%] px-2  mx-auto pt-4 pb-20 md:py-12">
                {/* CTA */}
                {/* <div className=" hidden  xl:flex  flex-wrap justify-between items-center gap-6  pb-8">
                    <div className='flex items-start gap-8'>

                        <div className="text-sm font-medium max-w-xs">
                            Be the first to get exclusive updates on new travel destinations, special offers and holiday packages with our newsletter.
                        </div>
                        <button className=" cursor-pointer bg-secondary px-5 py-1 rounded text-sm">Button</button>
                    </div>
                    <div className='flex items-start  gap-8'>

                        <div className="text-sm font-medium max-w-xs">
                            Your feedback matters to us! We truly value hearing your feedback and opinion.
                        </div>
                        <button className="cursor-pointer bg-secondary px-5 py-1 rounded text-sm">Button</button>
                    </div>

                </div> */}

                {/* Main Footer */}
                <div className="my-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                    {/* Logo */}
                    <div className="cursor-pointer">
                        <Image src={logo} alt="Fly Cham" width={180} height={40} />
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-2 mt-6 md:mt-0 text-xl">
                        {[
                            <PiThreadsLogo
                                onClick={() => {
                                    window.open(
                                        'https://www.threads.com/@fly.cham',
                                        '_blank'
                                    );
                                }}
                            />,
                            //  <FaTiktok />
                            //  ,
                            <FaInstagram
                                onClick={() => {
                                    window.open(
                                        'https://www.instagram.com/fly.cham/',
                                        '_blank'
                                    );
                                }}
                            />, <FaFacebookF onClick={() => {
                                window.open(
                                    'https://www.facebook.com/people/%D9%81%D9%84%D8%A7%D9%8A-%D8%B4%D8%A7%D9%85-Fly-Cham/61575817032233/',
                                    '_blank'
                                );
                            }} />,
                            // <FaYoutube />
                            // ,
                            <FaLinkedinIn
                                onClick={() => {
                                    window.open(
                                        'https://www.linkedin.com/company/fly-cham/',
                                        '_blank'
                                    );
                                }}
                            />,
                            <FaXTwitter
                                onClick={() => {
                                    window.open(
                                        'https://x.com/fly_cham',
                                        '_blank'
                                    );
                                }}
                            />,
                            //  <FaTelegramPlane />
                        ].map((Icon, index) => (
                            <div

                                key={index}
                                className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border border-[#D6B680] text-[#D6B680] hover:opacity-80 transition"
                            >
                                {Icon}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Sections */}

                <div className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-5 md:grid-cols-4  gap-4">


                    {sections.map((section, idx) => (
                        <div key={idx}>
                            <h4 className="font-semibold mb-3 text-secondary">{section.title}</h4>
                            <ul className="space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i} className={link === 'Holidays' ? '  font-semibold mt-2 text-secondary' : '  text-[#D2D1D3]'}>
                                        {link}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>


                {/* Footer Bottom */}
                <div className="text-center md:text-start mt-10 border-t border-white/20 pt-4 flex flex-col md:flex-row justify-between text-xs text-white/70">
                    <p>© {t('appfooter.rights')} Fly Cham 2025</p>
                    <div className="flex gap-4 mt-2 md:mt-0 justify-center">
                        <span>{t('appfooter.siteMap')}</span>
                        <span>{t('appfooter.privacy')}</span>
                        <span>{t('appfooter.terms')}</span>
                    </div>
                </div>
                <Image
            src={!isArabic ? sidebarar : footerPattern}
                    alt="Background Pattern"
                    className={
                        ` hidden md:block
 absolute opacity-30 bottom-0 ${isArabic ? 'left-0' : 'right-0'} w-[280px] md:w-[400px] pointer-events-none select-none z-0`
                    }
                    aria-hidden="true"
                />
            </footer>
        </div>
    );
};

export default Footer;
