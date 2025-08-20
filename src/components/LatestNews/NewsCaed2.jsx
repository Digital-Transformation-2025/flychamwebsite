import React from "react";
import Image from "next/image";
import { Clock } from "@phosphor-icons/react/dist/ssr";
import Divider from "../FlightResults/FlighSelectStep/Divider";

const NewsCard2 = ({ info }) => {
    const { image, date, category, title, description, link } = info;

    return (
        <div className="flex flex-col md:flex-row gap-4 py-4 rounded-lg bg-white transition">

            {/* ✅ Left Side - Image */}
            <div className="relative w-full md:w-[550px] h-[180px] md:h-[167px] rounded-lg overflow-hidden group">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
            </div>

            {/* ✅ Right Side - Content */}
            <div className="flex flex-col justify-between">
                {/* Date & Category */}
                <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} weight="regular" className="text-[#5F5F5C]" />
                    <span className="text-[12px] font-medium text-[#5F5F5C]">{date}</span>
                    <div className="w-1 h-1 rounded-full bg-[#5F5F5C]" />
                    <span className="text-sm font-medium bg-[#054e7221]  text-primary-1  px-3 py-1 rounded-full">
                        {category}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-primary-1 text-lg font-montserrat font-semibold mb-1 hover:underline cursor-pointer">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-[#3E3E3B] text-sm leading-5 mb-2">
                    {description}
                </p>

                {/* ✅ Read More (Optional Button or Link) */}
                <a
                    href={link}
                    className="text-primary-1 text-sm font-medium hover:underline mt-1"
                >
                    Read more →
                </a>
            </div>
      
        </div>
    );
};

export default NewsCard2;
