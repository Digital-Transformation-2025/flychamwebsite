'use client';

import React from 'react';
import bg from "@/assets/images/whoweare/bg.webp";
import shape from "@/assets/images/whoweare/shape.webp";
import cardimg1 from "@/assets/images/whoweare/cardimg1.webp";
import cardimg2 from "@/assets/images/whoweare/cardimg2.webp";
import cardimg3 from "@/assets/images/whoweare/cardimg3.webp";
import cardimg4 from "@/assets/images/whoweare/cardimg4.webp";
import cardimg5 from "@/assets/images/whoweare/cardimg5.webp";
import pattern from "@/assets/images/whoweare/pattern.webp";
import { CiDesktopMouse1 } from 'react-icons/ci';
import Reveal from '@/components/Ui/Reveal';
import Footer from '@/components/Layout/Footer';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const WhoWeAreClient = () => {
    const { t } = useTranslation();

    const cardData = [
        {
            img: cardimg1.src,
            title: t('whoweare.cards.community.title'),
            desc: t('whoweare.cards.community.desc'),
        },
        {
            img: cardimg2.src,
            title: t('whoweare.cards.passengers.title'),
            desc: t('whoweare.cards.passengers.desc'),
            isReversed: true,
        },
        {
            img: cardimg3.src,
            title: t('whoweare.cards.syrianCommunity.title'),
            desc: t('whoweare.cards.syrianCommunity.desc'),
        },
        {
            img: cardimg4.src,
            title: t('whoweare.cards.training.title'),
            desc: t('whoweare.cards.training.desc'),
            isReversed: true,
        },
        {
            img: cardimg5.src,
            title: t('whoweare.cards.futureLeaders.title'),
            desc: t('whoweare.cards.futureLeaders.desc'),
        },
    ];
    const FullScreenCard = ({ img, title, desc, isReversed, index }) => {
        return (
            <div className={`w-full h-screen flex flex-col ${isReversed ? `md:flex-row-reverse` : `md:flex-row`}`}>
                {/* Left Side: Text + Pattern */}
                <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 md:px-30 py-10 relative">
                    {/* Optional background pattern */}
                    <motion.img
                        src={pattern.src}
                        alt="pattern"
                        className="absolute left-0 top-0 w-full max-w-5xl z-0"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: index % 2 !== 0 ? 360 : 0 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                    />                    <div className="z-10">
                        <Reveal delay={0.1}>

                            <h2 className="text-black text-[40px] font-black  mb-6 leading-tight">
                                {title}
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>

                            <p className="text-black text-[18px] font-normal font-[Inter] leading-relaxed">
                                {desc}
                            </p>
                        </Reveal>
                    </div>
                </div>

                {/* Right Side: Image tag */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-full overflow-hidden rounded-[20px] shadow-xl">
                    <motion.img
                        src={img}
                        alt="Card visual"
                        className="w-full h-full object-cover rounded-[20px] transition-all duration-700 ease-in-out"
                        initial={{ opacity: 0, scale: 1.05 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        viewport={{ once: true, amount: 0.3 }}
                    />
                </div>
            </div>
        );
    };

    return (
        <>

            <div className="hidden xl:block relative w-full overflow-visible bg-white">
                {/* Masked Background Section */}
                <div
                    className="w-full min-h-[2000px] bg-fixed bg-center bg-cover flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${bg.src})`,
                        WebkitMaskImage: `url(${shape.src})`,
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskSize: 'contain',
                        WebkitMaskPosition: 'top -10px right -80px',
                        maskImage: `url(${shape.src})`,
                        maskRepeat: 'no-repeat',
                        maskSize: '130% auto',
                        maskPositionX: '95%',
                        maskPositionY: '10%',
                    }}
                >
                    {/* Overlay Text Content */}
                    <div className="absolute top-[13%] text-white text-center px-6 md:px-20 max-w-5xl space-y-8">
                        <Reveal delay={0.1}>

                            <h1 className="text-[82px] font-semibold leading-tight break-words">
                                {t('whoweare.hero.title')}                            </h1>
                        </Reveal>
                        <Reveal delay={0.2}>


                            <p className="text-[18px] break-words">
                                {t('whoweare.hero.subtitle')}                            </p>
                        </Reveal>
                    </div>

                </div>

                <div className="absolute top-[37%] left-[15%] flex items-start justify-between w-[80%]">
                    {/* Left text */}
                    <Reveal delay={0.3}>

                        <div className="text-[#2A2A2A] text-[28px] font-bold  leading-[33px] tracking-[0.07em] max-w-md">
                            {t('whoweare.middle.highlight')}                        </div>
                    </Reveal>

                    {/* Right text + button */}
                    <Reveal delay={0.3}>


                        <div className="text-white  max-w-sm flex justify-center items-center flex-col ">
                            <p className="text-[18px] text-start font-medium  tracking-[0.04em] break-words mb-1">
                                {t('whoweare.middle.description')}                            </p>
                            <button
                                className="cursore-pointer flex items-center justify-center gap-2 text-white text-sm font-semibold"
                                style={{
                                    width: '158px',
                                    height: '36px',
                                    flexShrink: 0,
                                    borderRadius: '5.7px',
                                    background: '#054E72',
                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                }}
                            >
                                {t('whoweare.button.discover')}                                <span className="text-lg"><CiDesktopMouse1 /></span>
                            </button>
                        </div>

                    </Reveal>
                </div>
                <div className="absolute bottom-[10%] w-full text-center px-4">
                    <div>
                        <Reveal delay={0.1}>

                            <h1 className="text-[82px] text-[#2A2A2A] font-semibold  leading-tight break-words">

                                {t('whoweare.responsibility.title')}                            </h1>
                        </Reveal>
                        <Reveal delay={0.2}>

                            <p className="mt-6 text-[18px] text-[#2A2A2A] font-semibold  max-w-4xl mx-auto break-words leading-normal">
                                {t('whoweare.responsibility.description')}                            </p>
                        </Reveal>
                    </div>

                </div>
                <div className="absolute bottom-[1%] left-[15%] flex items-start justify-between w-[80%]">
                    {/* Left text */}
                    <Reveal delay={0.2}>

                        <div className="text-[#2A2A2A] text-[28px] font-bold  leading-[33px] tracking-[0.07em] max-w-md">
                            {t('whoweare.bottom.statementTitle')}              </div>
                    </Reveal>

                    {/* Right text + black */}
                    <Reveal delay={0.2}>

                        <div className="text-black  max-w-sm flex justify-center items-center flex-col ">
                            <p className="text-[18px] text-start font-medium  tracking-[0.04em] break-words mb-1">
                                {t('whoweare.bottom.statementDescription')}                  </p>
                            <button
                                className="flex items-center justify-center gap-2 text-white text-sm font-semibold"
                                style={{
                                    width: '158px',
                                    height: '36px',
                                    flexShrink: 0,
                                    borderRadius: '5.7px',
                                    background: '#054E72',
                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                }}
                            >
                                {t('whoweare.button.discover')}                                <span className="text-lg"><CiDesktopMouse1 /></span>
                            </button>
                        </div>
                    </Reveal>


                </div>
            </div>
            <div className="block xl:hidden relative w-full bg-white text-center">
                {/* Background */}
                <div
                    className="w-full h-[700px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${bg.src})` }}
                >
                    {/* Top Section: Who We Are */}
                    <div className="pt-12 px-6 space-y-6 text-white">
                        <Reveal delay={0.1}>
                            <h1 className="text-[42px] font-semibold leading-tight break-words">
                                {t('whoweare.hero.title')}                            </h1>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <p className="text-[16px] font-medium leading-relaxed">
                                {t('whoweare.hero.subtitle')}
                            </p>
                        </Reveal>
                    </div>
                    {/* Middle Text Block */}
                    <div className="py-12 px-6 space-y-6">
                        <Reveal delay={0.3}>
                            <h2 className="text-[22px] font-bold text-white">
                                {t('whoweare.middle.highlight')}                            </h2>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <div className="text-white text-[15px] font-medium space-y-4">
                                <p>
                                    {t('whoweare.middle.description')}                                </p>
                                <button
                                    className="mx-auto flex items-center justify-center gap-2 text-white text-sm font-semibold px-5 py-2 rounded-md"
                                    style={{
                                        background: '#054E72',
                                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                    }}
                                >
                                    {t('whoweare.button.discover')} <CiDesktopMouse1 className="text-lg" />
                                </button>
                            </div>
                        </Reveal>
                    </div>
                </div>



                {/* Our Responsibility Section */}
                <div className="bg-white px-6 py-12 space-y-6">
                    <Reveal delay={0.1}>
                        <h1 className="text-[42px] text-[#2A2A2A] font-semibold leading-tight">
                            {t('whoweare.responsibility.title')}                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-[16px] text-[#2A2A2A] font-medium leading-relaxed">
                            {t('whoweare.responsibility.description')}                        </p>
                    </Reveal>
                </div>

                {/* Bottom Statement */}
                <div className="bg-white px-6 pb-20 space-y-6">
                    <Reveal delay={0.2}>
                        <h2 className="text-[22px] font-bold text-[#2A2A2A]">
                            {t('whoweare.bottom.statementTitle')}                        </h2>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <div className="text-[#2A2A2A] text-[15px] font-medium space-y-4">
                            <p>
                                {t('whoweare.bottom.statementDescription')}                            </p>
                            <button
                                className="mx-auto flex items-center justify-center gap-2 text-white text-sm font-semibold px-5 py-2 rounded-md"
                                style={{
                                    background: '#054E72',
                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                }}
                            >
                                {t('whoweare.button.discover')} <CiDesktopMouse1 className="text-lg" />
                            </button>
                        </div>
                    </Reveal>
                </div>
            </div>
            {cardData.map((card, index) => (
                <Reveal delay={0.2}>

                    <FullScreenCard
                        key={index}
                        index={index}
                        img={card.img}
                        title={card.title}
                        desc={card.desc}
                        isReversed={card.isReversed}
                    />
                </Reveal>
            ))}
        </>

    );
};

export default WhoWeAreClient;
