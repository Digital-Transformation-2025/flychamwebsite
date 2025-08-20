import React from "react";
import Image from "next/image";
import { ArrowRight, Clock } from "@phosphor-icons/react/dist/ssr";

const LatestNews = ({ lastNews }) => {
    const { date, category, title, description, image, link } = lastNews;

    return (
        <section className="w-full px-4 md:px-8 lg:px-50 mt-[34px]">
            {/* ✅ Section Title */}
            <h2 className="text-primary-1 text-2xl md:text-3xl bg font-bold mb-6">
                Latest News
            </h2>

            {/* ✅ News Card */}
            <div className="flex flex-col-reverse lg:flex-row gap-6 justify-center items-start ">
                {/* ✅ Left Column: Text */}
                <div className="  ">
                    {/* ✅ Date & Category */}
                    <div className="flex items-center gap-2 text-600 mb-2">
                        <Clock size={18} weight="regular" />
                        <span className="text-sm md:text-base bg font-medium">
                            {date}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-600" />
                        <span className="text-sm md:text-base bg-[#054e7224] bg-opacity-10 text-[#054E72] font-medium px-3 py-1 rounded-full">
                            {category}
                        </span>


                    </div>

                    {/* ✅ Title */}
                    <h3 className="text-primary-1 text-lg md:text-xl lg:text-2xl bg font-semibold mb-3 hover:underline">
                        {title}
                    </h3>

                    {/* ✅ Description */}
                    <p className="text-sm md:text-base bg leading-6 mb-[24px] break-words max-w-[600px]">
                        {description}
                    </p>

                    {/* ✅ Read More Button */}
                    <button
                        // onClick={() => window.location.href = link} // Or use Next.js router.push(link)
                        className="
    inline-flex items-center justify-center gap-2 
    px-4 py-2 md:px-6 md:py-3 
    bg-[#BAA981] rounded-xl 
    text-white text-base md:text-lg bg font-semibold 
    hover:bg-[#a3936d] transition w-full sm:w-auto
  "
                    >
                        Read more
                        <ArrowRight size={18} weight="bold" />
                    </button>

                </div>

                {/* ✅ Right Column: Image */}
                <div className="w-full flex justify-center overflow-hidden group">
                    <Image
                        src={image}
                        alt={title}
                        width={800}        // ✅ Fixed width
                        height={250}       // ✅ Fixed height
                        className="rounded-xl w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                </div>

            </div>
        </section>
    );
};

export default LatestNews;
