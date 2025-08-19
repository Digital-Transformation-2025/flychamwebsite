'use client';
import React from 'react';
import Image from 'next/image';
import { CheckCircle } from '@phosphor-icons/react';
import managePanner from '../../assets/images/managePanner.png';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import useIsMobile from '@/hooks/useIsMobile';

const Panner = ({
    origin = '',
    destination = '',
    dateLabel = '',
    pnr = '',
    status = 'Confirmed',
    mainImage
}) => {

    const isConfirmed = String(status).toLowerCase() === 'confirmed';
    const isMobile = useIsMobile();

    return (
        <section className="relative w-full overflow-hidden">
            {/* Background image */}
            <div className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] xl:h-[500px]">
                <Image
                    src={mainImage || managePanner} // Use default fallback image if mainImage is not provided
                    alt={`${origin} to ${destination}`}
                    layout="fill"  // Takes up the full space
                    objectFit="cover" // Ensures it covers the whole div without distortion
                    priority
                    sizes="100vw"
                    className="object-cover" // Ensure the image covers the container
                />
                {/* Dark gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50  to-black/10" />
            </div>

            {/* Content overlay */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-4 sm:px-6 md:px-15 py-4 md:py-5 text-white">
                {/* Top-left trip info */}
                <div className="space-y-1 sm:space-y-2 mt-0 xl:mt-20">
                    <p className="text-[11px] sm:text-xs md:text-lg lg:text-md text-white/80">Your upcoming trip</p>
                    <h1 className="flex items-center gap-2 text-[20px] sm:text-2xl md:text-5xl font-semibold tracking-tight">
                        {origin}
                        <ArrowRight size={isMobile ? 18 : 38} />
                        {destination}
                    </h1>
                    <p className="text-[11px] sm:text-xs md:text-sm lg:text-lg text-white/85">{dateLabel}</p>
                </div>

                {/* Bottom row: PNR (left) + status (right) */}
                <div className="flex items-center justify-between px-0 lg:px-20">
                    <div className="text-white/90 text-[12px] sm:text-lg flex flex-col lg:flex-row">
                        <span className="opacity-90">Booking reservation (PNR): </span>
                        <span className="font-semibold tracking-wide">{pnr}</span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-lg ">
                        <div
                            className="flex flex-col lg:flex-row relative
         rounded-md px-3 py-2"
                        >
                            <span className="opacity-90 mx-2 text-white">Booking status:</span>
                            <div className="flex gap-2 items-center">
                                {isConfirmed && (
                                    <CheckCircle
                                        weight="fill"
                                        size={16}
                                        className="text-[#27AE60] translate-y-[1px]"
                                    />
                                )}
                                <span
                                    className={`font-semibold ${isConfirmed ? "text-[#27AE60]" : "text-yellow-400"
                                        }`}
                                >
                                    {status}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Panner;
