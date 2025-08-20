'use client'
import React, { useRef } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import { X, ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import SocialMediaIcons from '../Ui/SocialMediaIcons'

const GalleryModal = ({ isOpen, onClose, gallery, startIndex }) => {
    if (!isOpen) return null;

    const sliderRef = useRef(null); // ✅ Create a ref for the slider

    const settings = {
        initialSlide: startIndex,
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    return (
        <div
            onClick={onClose} // Close when clicking background
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[1000px]">

                {/* ❌ Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-[-30] right-[-30] bg-white/60  p-2 rounded-full z-50 
             hover:bg-[#054E72] transition-all duration-300 group cursor-pointer"
                >
                    <X
                        size={12}
                        weight="bold"
                        className="text-gray-800 group-hover:text-white transition-colors duration-300"
                    />
                </button>


                {/* 🖼 Slick Slider */}
                <Slider ref={sliderRef} {...settings}>
                    {gallery.map((item) => (
                        <div key={item.id} className="flex justify-center">
                            <div className="flex flex-col w-full max-w-[1000px]">
                                {/* 🖼 Image */}
<div className="relative w-full aspect-video rounded-t-xl overflow-hidden">
  <Image
    src={item.image}
    alt={`gallery-${item.id}`}
    fill
    className="object-cover"
  />
</div>



                            </div>
                        </div>
                    ))}
                </Slider>

                {/* ✅ Bottom Bar */}
                <div className="bg-[#F5F5F4] flex flex-col lg:flex-row justify-between items-center px-4 lg:px-6 py-4 rounded-b-xl gap-3 lg:gap-0">
                    <button className="cursor-pointer w-full lg:w-auto px-4 py-2 bg-[#054E72] text-white text-xs font-semibold rounded-lg hover:bg-[#043b57]">
                        Download
                    </button>

                    <div className="flex flex-col-reverse sm:flex-row justify-center sm:justify-between lg:justify-end w-auto sm:w-full items-center">
                        {/* ✅ Mobile Arrows */}
                        <MobileArrow sliderRef={sliderRef} />
                        <SocialMediaIcons />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GalleryModal

// ✅ Desktop Arrows (hidden on mobile)
const CustomNextArrow = ({ onClick }) => (
    <div
        className="hidden lg:flex absolute top-1/2 right-[-50px] xl:right-[-100px] transform -translate-y-1/2 bg-[#054E72] p-3 rounded-full cursor-pointer hover:bg-[#043b57] z-40"
        onClick={onClick}
    >
        <ArrowRight size={20} className="text-white" />
    </div>
)

const CustomPrevArrow = ({ onClick }) => (
    <div
        className="hidden lg:flex absolute top-1/2  left-[-50px] xl:left-[-100px] transform -translate-y-1/2 bg-[#054E72] p-3 rounded-full cursor-pointer hover:bg-[#043b57] z-40"
        onClick={onClick}
    >
        <ArrowLeft size={20} className="text-white" />
    </div>
)

// ✅ Mobile Arrow Component — now using sliderRef
const MobileArrow = ({ sliderRef }) => {
    return (
        <div className="flex lg:hidden justify-center gap-4 mt-3">
            <button
                className="bg-[#054E72] p-3 rounded-full cursor-pointer hover:bg-[#043b57] "
                onClick={() => sliderRef.current?.slickPrev()}
            >
                <ArrowLeft size={20} className="text-white" />
            </button>
            <button
                className="bg-[#054E72] p-3 rounded-full cursor-pointer hover:bg-[#043b57]"
                onClick={() => sliderRef.current?.slickNext()}
            >
                <ArrowRight size={20} className="text-white" />
            </button>
        </div>
    )
}
