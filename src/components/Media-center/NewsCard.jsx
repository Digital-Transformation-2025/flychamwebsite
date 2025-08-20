import React from "react";
import Image from "next/image";
import { Clock, ArrowRight } from "@phosphor-icons/react/dist/ssr";

const NewsCard = ({ info }) => {
    const { date, category, title, description, image, link } = info;

    return (
        <>
            <div className="bg-white rounded-xl shadow-md overflow-hidden w-full lg:max-w-[497px]  flex flex-col h-[480px] ">
                {/* ✅ Image */}
    <div className="relative w-full h-[200px] overflow-hidden group">
  <Image
    src={image}
    alt={title}
    fill
    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-115"
  />
</div>


                {/* ✅ Card Content */}
                <div className="p-4 flex flex-col flex-grow">
                    {/* Date & Category */}
                    <div className="flex items-center gap-3 text-sm mb-2">
                        <div className="flex items-center gap-1 text-600">
                            <Clock size={16} />
                            <span className="text-[14px]  font-medium">{date}</span>
                        </div>
                        <div className="px-3 py-1 bg-[#054E72]/10  text-primary-1 text-[14px] font-medium  rounded-full ">
                            {category}
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-700 text-lg  font-semibold mb-2">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-700 text-sm font-redular  leading-5 mb-3 line-clamp-3">
                        {description}
                    </p>

                    {/* Read More */}
                    <a
                        href={link}
                        className="mt-auto ml-auto w-8 h-8 bg-primary-1 rounded-full flex items-center justify-center hover:bg-primary-700 transition"
                    >
                        <ArrowRight size={18} weight="bold" color="#fff" />
                    </a>
                </div>

            </div>
     
        </>

    );
};

export default NewsCard;
