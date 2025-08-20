import React from "react";
import Image from "next/image";
import gallery from "../../assets/images/Media-center/gallery.png"
const Resources = () => {
    const resources = [
        {
            title: "Gallery",
            image: gallery,
            link: "/gallery",
        },
        {
            title: "Fact sheets",
            image: gallery,
            link: "/factsheets",
        },
        {
            title: "About",
            image: gallery,
            link: "/about",
        },
    ];

    return (
        <section className="bg-[#F5F5F4] py-10 ">
            {/* ✅ Section Title */}
            <div className="px-4 md:px-8 lg:px-50 ">

                <h2 className="text-primary-1 text-start text-[32px] md:text-[40px] font-montserrat font-bold mb-10">
                    Resources
                </h2>
            </div>

            {/* ✅ Cards Grid */}
            <div className="px-4 md:px-8 lg:px-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {resources.map((item, idx) => (
                    <a
                        key={idx}
                        href={item.link}
                        className="relative w-full h-[200px] rounded-lg overflow-hidden group"
                    >
                        {/* Image */}
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={341}
                            height={176}
                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-115"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>

                        {/* Title */}
                        <h3 className="absolute inset-0 flex items-center justify-center text-white text-2xl font-montserrat font-semibold">
                            {item.title}
                        </h3>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Resources;
