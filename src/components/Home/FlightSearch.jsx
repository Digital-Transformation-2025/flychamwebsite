'use client';

import { FaLocationArrow, FaExchangeAlt, FaSearch } from 'react-icons/fa';
import HeroSearchModal from './HeroSearchModal';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import searchPattern from '@/assets/images/searchPattern.webp';
import { useTranslation } from 'react-i18next';
import useIsArabic from '@/hooks/useIsArabic';

const FlightSearch = ({ isHome }) => {
    const [isSwitched, setIsSwitched] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTap, setActiveTap] = useState(0);
    const { t } = useTranslation()

    const handleModalOpen = () => {
        // setIsModalOpen(true)
    }

    const fromCard = (
        <motion.div
            layout
            className="cursor-pointer bg-main text-white rounded-2xl p-4 flex-1 w-full"
            onClick={handleModalOpen}
        >
            <div className="flex items-center gap-2 mb-1 ">
                <FaLocationArrow className="text-sm" />
                <span className="text-xs uppercase tracking-wider">{t('flightSearch.from')}</span>
            </div>
            <h3 className="text-lg font-semibold">
                {t(`flightSearch.airports.${isSwitched ? 'kuwait' : 'damascus'}.code`)}
            </h3>
            <p className="text-sm text-blue-100">
                {t(`flightSearch.airports.${isSwitched ? 'kuwait' : 'damascus'}.name`)}
            </p>
        </motion.div>
    );

    const toCard = (
        <motion.div
            layout
            className=" cursor-pointer bg-secondary text-white rounded-2xl p-4 flex-1  w-full"
            onClick={handleModalOpen}        >
            <div className="flex items-center gap-2 mb-1">
                <FaLocationArrow className="text-sm" />
                <span className="text-xs uppercase tracking-wider text-white">{t('flightSearch.to')}</span>
            </div>
            <h3 className="text-lg font-semibold text-white">
                {t(`flightSearch.airports.${isSwitched ? 'damascus' : 'kuwait'}.code`)}
            </h3>
            <p className="text-sm text-white">
                {t(`flightSearch.airports.${isSwitched ? 'damascus' : 'kuwait'}.name`)}
            </p>
        </motion.div>
    );


    return (
        <div
            id="search-widget"
            style={{
                backgroundImage: `url(${searchPattern.src})`, backgroundRepeat: 'no-repeat',
                backgroundPosition: '925px 0px',
            }}
            className={`${true && 'mt-[-75px]'} bg-white rounded-3xl shadow-md p-8 relative z-20 transition`}>

            {/* Tabs */}
            <div className="bg-white  p-3  inline-flex space-x-2 mb-6" style={{
                borderRadius: '14px',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}>

                {[t('flightSearch.oneWay'), t('flightSearch.Return')].map((label, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTap(index)}
                        className={`cursor-pointer px-6 py-2 rounded-full font-semibold transition-all duration-400 ${activeTap === index
                            ? 'bg-secondary text-main'
                            : 'text-main hover:text-[#04384e]'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>


            {/* Inputs and button */}
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                {(activeTap === 0 || activeTap === 1) &&
                    <>

                        <motion.div layout className="flex flex-col md:flex-row items-center  w-full">
                            {/* Always render fromCard first, toCard second - only content changes */}
                            {fromCard}
                            <motion.div
                                layout
                                onClick={() => setIsSwitched(!isSwitched)}
                                className="cursor-pointer bg-secondary text-white w-6 h-6 flex items-center justify-center rounded-full"
                            >
                                <FaExchangeAlt className="text-sm text-main rotate-90 md:rotate-0" />
                            </motion.div>
                            {toCard}
                        </motion.div>
                        <button
                            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 mt-4 md:mt-0 rounded-xl font-semibold text-sm md:text-base tracking-wide whitespace-nowrap
             text-main bg-secondary hover:bg-secondary-light active:scale-[0.98] transition-all duration-300 ease-in-out
             shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary-light"
                        >
                            <FaSearch className="text-sm md:text-base" />
                            {t('flightSearch.search')}
                        </button>



                    </>
                }

                {/* Button */}

            </div>
            {isModalOpen && <HeroSearchModal activeTap={activeTap} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}

        </div >
    );
};

export default FlightSearch;