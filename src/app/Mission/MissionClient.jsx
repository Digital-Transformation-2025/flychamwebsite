"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import plane from "@/assets/images/mission/plane.webp";
import pattern from "@/assets/images/mission/pattern.webp";
import hostess from "@/assets/images/mission/hostess.webp";
import pattern2 from "@/assets/images/mission/pattern2.webp";
import pattern3 from "@/assets/images/mission/pattern3.webp";
import hostess2 from "@/assets/images/mission/hostess2.webp";
import hostess3 from "@/assets/images/mission/hostess3.webp";
import pattern4 from "@/assets/images/mission/pattern4.webp";
import SideBar from "@/components/Layout/SideBar";
import useCustomScroller from "@/hooks/useCustomScroller";
import CustomScroller from "@/components/Ui/CustomScroller";
import { useTranslation } from "react-i18next";

const MissionClient = () => {
    const { t } = useTranslation();
    const values = [
        {
            title: t('mission.values.customerFocus.title'),
            description: t('mission.values.customerFocus.description'),
        },
        {
            title: t('mission.values.excellence.title'),
            description: t('mission.values.excellence.description'),
        },
        {
            title: t('mission.values.professionalism.title'),
            description: t('mission.values.professionalism.description'),
        },
        {
            title: t('mission.values.teamwork.title'),
            description: t('mission.values.teamwork.description'),
        },
    ];
    const sections = [
        {
            id: "plane",
            content: (
                <div className="flex flex-col justify-center h-full items-center z-10">
                    <img
                        src={pattern.src || pattern}
                        alt="pattern"
                        className="absolute top-0 right-0 w-full max-w-xl lg:max-w-2xl z-0 opacity-80"
                    />
                    <h2 className="text-center text-[#2A2A2A] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold drop-shadow-md leading-tight mb-4 md:mb-8 px-4">
                        {t('mission.sections.excellenceBanner')}                </h2>
                    <img src={plane.src || plane} alt="Fly Cham Plane" className="w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl h-auto z-10 px-4" />
                </div>
            ),
        },
         {
            id: "vision",
            content: (
                <div className=" z-10 h-auto md:h-full flex flex-col md:flex-row-reverse  items-center justify-center gap-1 md:gap-8">
                    <img src={pattern2.src || pattern2} alt="pattern" className="absolute top-0 left-0  max-w-3xl lg:max-w-4xl z-0 opacity-70" />
                    <div className="flex-1 z-10 py-6 md:py-10 px-6 md:px-12 lg:px-20 text-center">
                        <h2 className="text-[#2A2A2A] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">{t('mission.sections.vision.title')}</h2>
                        <p className="text-[#2A2A2A] text-sm sm:text-base md:text-lg lg:text-xl font-semibold leading-relaxed max-w-3xl mx-auto">
                            {t('mission.sections.vision.description')}                    </p>
                    </div>
                    <div className=" flex-1  relative  flex items-center justify-center z-10">
                        {/* <div className="absolute right-0 top-0 lg:top-[20%] w-[80%] h-[70%] bg-[#EFE9E1] rounded-tl-[40px] z-0"></div> */}
                        <img src={hostess2.src || hostess2} alt="hostess" className="relative z-10 w-full max-w-xs md:max-w-xl lg:max-w-md xl:max-w-lg h-auto" />
                    </div>
                </div>
            ),
        },
        {
            id: "mission",
            content: (
                <div className=" z-10 h-auto md:h-full flex flex-col md:flex-row  items-center justify-center gap-1 md:gap-8">
                    <img src={pattern2.src || pattern2} alt="pattern" className="absolute top-0 left-0  max-w-3xl lg:max-w-4xl z-0 opacity-70" />
                    <div className="flex-1 z-10 py-6 md:py-10 px-6 md:px-12 lg:px-20 text-center">
                        <h2 className="text-[#2A2A2A] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">{t('mission.sections.mission.title')}</h2>
                        <p className="text-[#2A2A2A] text-sm sm:text-base md:text-lg lg:text-xl font-semibold leading-relaxed max-w-3xl mx-auto">
                            {t('mission.sections.mission.description')}                    </p>
                    </div>
                    <div className=" flex-1  relative  flex items-center justify-center z-10">
                        {/* <div className="absolute right-0 top-0 lg:top-[20%] w-[80%] h-[70%] bg-[#EFE9E1] rounded-tl-[40px] z-0"></div> */}
                        <img src={hostess.src || hostess} alt="hostess" className="relative z-10 w-full max-w-xs md:max-w-xl lg:max-w-md xl:max-w-lg h-auto" />
                    </div>
                </div>
            ),
        },
       
        {
            id: "values",
            content: (
                <div className="z-10 h-auto md:h-full flex flex-col md:flex-row-reverse  items-baseline md:items-center justify-center gap-1 md:gap-8">
                    <div className="hidden xl:flex flex-1   items-center justify-center z-10">
                        {/* <div className="absolute left-0 top-[20%] w-[80%] h-[70%] bg-[#EFE9E1] rounded-tr-[40px] z-0"></div> */}
                        <img src={hostess3.src || hostess3} alt="hostess3" className=" relative z-10 w-full max-w-sm lg:max-w-md xl:max-w-lg h-auto" />
                    </div>
                    <img src={pattern4.src || pattern4} alt="pattern" className="absolute top-0 right-0 w-full max-w-4xl lg:max-w-5xl z-0 opacity-70" />
                    <div className="flex-1 min-w-[300px] z-10 p-6 md:p-8">
                        <h2 className="text-[#2A2A2A] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-center mb-4 md:mb-6 leading-tight">{t('mission.sections.values.title')}</h2>
                        <div className="grid grid-cols-1 xl:flex xl:flex-col gap-3 sm:grid-cols-2">
                            {values.map(({ title, description }) => (
                                <div
                                    key={title}
                                    className="bg-white/40 backdrop-blur-sm rounded-xl p-4 md:p-5 border-l-4 border-[#2A2A2A] shadow-sm"
                                >
                                    <span className="font-black text-lg md:text-xl lg:text-2xl block mb-2">{title}</span>
                                    <span className="font-medium text-[#444444]">{description}</span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            ),
        },
    ];
    const isDragging = useRef(false);
    const {
        current,
        setCurrent,
        thumbTop,
        trackRef,
        handleTrackClick,
        handleThumbMouseDown,
        thumbHeight,
    } = useCustomScroller(sections.length);
    return (
        <div className="relative  h-screen  bg-white overflow-hidden flex justify-center">
            {/* Section View */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={sections[current].id}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -60 }}
                    transition={{ duration: 0.6 }}
                    className="h-full flex items-center justify-center"
                >
                    {sections[current].content}
                </motion.div>
            </AnimatePresence>

            {/* Custom Scrollbar */}
            <CustomScroller
                trackRef={trackRef}
                thumbTop={thumbTop}
                thumbHeight={thumbHeight}
                handleTrackClick={handleTrackClick}
                handleThumbMouseDown={handleThumbMouseDown}
            />

        </div>
    );
};

export default MissionClient;