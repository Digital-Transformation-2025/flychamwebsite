'use client';
import React from 'react';
import Image from 'next/image';
import { CheckCircle } from '@phosphor-icons/react';
import managePanner from '../../assets/images/managePanner.png';

const Panner = ({
    origin = 'Damascus',
    destination = 'Dubai',
    dateLabel = '10 JUL,2025',
    pnr = 'NHG7YO',
    status = 'Confirmed',
}) => {
    const isConfirmed = String(status).toLowerCase() === 'confirmed';

    return (
        <section className="relative w-full overflow-hidden ">
            {/* Background image */}
            <div className="relative h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] xl:h-[500px]">
                <Image
                    src={managePanner}
                    alt={`${origin} to ${destination}`}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
                {/* Dark gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/40 to-black/20" />
            </div>

            {/* Content overlay */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-4 sm:px-6 md:px-8 py-4 md:py-5 text-white">
                {/* Top-left trip info */}
                <div className="space-y-1 sm:space-y-2 mt-0 md:mt-20">
                    <p className="text-[11px] sm:text-xs md:text-sm lg:text-md text-white/80">Your upcoming trip</p>
                    <h1 className="text-[20px] sm:text-2xl md:text-5xl font-semibold tracking-tight">
                        {origin} <span className="mx-1 sm:mx-2">→</span> {destination}
                    </h1>
                    <p className="text-[11px] sm:text-xs md:text-sm lg:text-lg text-white/85">{dateLabel}</p>
                </div>

                {/* Bottom row: PNR (left) + status (right) */}
                <div className="flex items-center justify-between -sm px-20">
                    <div className="text-white/90 text-[12px] sm:text-lg">
                        <span className="opacity-90">Booking reservation (PNR): </span>
                        <span className="font-semibold tracking-wide">{pnr}</span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-lg">
                        <span className="opacity-90">Booking status:</span>
                        <span
                            className={`font-semibold ${isConfirmed ? 'text-[#27AE60]' : 'text-yellow-400'
                                }`}
                        >
                            {status}
                        </span>
                        {isConfirmed && (
                            <CheckCircle
                                weight="fill"
                                size={16}
                                className="text-[#27AE60] translate-y-[1px]"
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Panner;
