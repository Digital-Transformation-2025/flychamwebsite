'use client';
import Footer from '@/components/Layout/Footer';
import React from 'react';
import { useRouter } from 'next/navigation';
import wallpaper from "@/assets/images/travel-agent/wallpaper.jpeg";
import { useTranslation } from 'react-i18next';

const TravelAgentClient = () => {
    const router = useRouter();
    const { t } = useTranslation(); // ✅ Correctly access t

    const handleNavigate = (link) => {
        if (link.startsWith('http')) {
            window.open(link, '_blank');
        } else {
            router.push(link);
        }
    };

    const Card = ({ titleKey, textKey, link }) => (
        <div className="bg-main text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-center shadow-xl bg-opacity-90 backdrop-blur-md transition-transform hover:scale-105">
            <div>
                <h2 className="text-2xl font-bold mb-4">{t(titleKey)}</h2>
                <p className="text-sm sm:text-base font-light leading-relaxed">{t(textKey)}</p>
            </div>
            <button
                onClick={titleKey === 'travelAgent.login.title' ? () => handleNavigate(link) : undefined}
                className="cursor-pointer w-full bg-secondary text-white font-semibold px-4 py-2 rounded mt-6 hover:bg-[#f6c940] transition-all"
            >
                {t('travelAgent.button')}
            </button>
        </div>
    );

    return (
        <>
            <div
                className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative"
                style={{
                    backgroundImage: `url(${wallpaper.src})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed"
                }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card
                        titleKey="travelAgent.join.title"
                        textKey="travelAgent.join.text"
                        link=""
                    />
                    <Card
                        titleKey="travelAgent.login.title"
                        textKey="travelAgent.login.text"
                        link="https://reservations.flycham.com/xbe/"
                    />
                </div>
            </div>
        </>
    );
};

export default TravelAgentClient;
