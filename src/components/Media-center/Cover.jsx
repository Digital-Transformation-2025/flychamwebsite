import React from 'react'
import Image from 'next/image'

const Cover = ({ title, disc, coverImg }) => {
    return (
        <div className="relative w-full h-[300px] sm:h-[380px] md:h-[450px] lg:h-[500px] overflow-hidden">
            {/* ✅ Background Image */}
            <Image
                src={coverImg}
                alt="Media center cover"
                layout="fill"
                objectFit="cover"
                priority
            />

            {/* ✅ Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* ✅ Text content aligned LEFT */}
            <div className="absolute inset-0 flex flex-col items-start justify-end px-4 md:px-8 lg:px-50  pb-6 sm:pb-8 md:pb-10">
                <h1 className="text-white text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-montserrat font-semibold leading-tight">
                    {title}
                </h1>
                {disc &&

                    <p className="text-white text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-montserrat font-medium mt-2 max-w-[700px]">
                        {disc}
                    </p>
                }
            </div>
        </div>
    )
}

export default Cover
