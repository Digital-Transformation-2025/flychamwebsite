'use client'
import React from 'react';
import Image from 'next/image';
import phone from '@/assets/images/Help/phone.webp';
import pattern from '@/assets/images/Help/pattern.webp';
import bg from '@/assets/images/Help/bg.webp';

const Help = () => {
    return (
        <div
            className="w-full rounded-[40px] overflow-hidden bg-center bg-cover "
            style={{
                backgroundImage: `url(${bg.src})`,
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-10 md:py-14 gap-6">
                {/* Left Text Area */}
                <div className="max-w-[500px] space-y-4 text-white">
                    <h1 className="text-[32px] md:text-[50px] font-bold leading-[1.2] font-[Montserrat]">
                        Want any Help ?
                    </h1>
                    <p className="text-[10px] md:text-[12px] font-medium leading-[1.4] font-[Montserrat]">
                        You can call us for immediately help, we are here to serve your need.
                    </p>
                    <button className="bg-[#a49f87] hover:bg-[#8d886f] text-white text-[10px] font-bold px-4 py-2 rounded-[4px] w-fit">
                        Contact us
                    </button>
                </div>

                {/* Right Phone Image */}
                {/* <div className="flex justify-center md:justify-end">
                    <Image
                        src={phone}
                        alt="Phone"
                        className="object-contain"
                        width={300}
                        height={300}
                        priority
                    />
                </div> */}
            </div>
        </div>
    );
};

export default Help;
