'use client'
import React, { useState } from 'react'
import newsImg from "../../../assets/images/Media-center/newsImg.png"
import c1 from "../../../assets/images/Media-center/c1.png"
import c2 from "../../../assets/images/Media-center/c2.png"

import n1 from "../../../assets/images/Media-center/n1.png"
import n2 from "../../../assets/images/Media-center/n2.jpg"
import n3 from "../../../assets/images/Media-center/n3.jpg"
import n4 from "../../../assets/images/Media-center/n4.jpg"
import n5 from "../../../assets/images/Media-center/n5.jpg"
import lastNewImg from "../../../assets/images/Media-center/lastNewImg.png"
import { ArrowsOutSimple, Clock, DownloadSimple } from '@phosphor-icons/react/dist/ssr'
import MediaCenterLayout from '@/components/Ui/MediaCenterLayout'
import Image from 'next/image'
import Gallery from '@/components/Media-center/Gallery'
import Vedio from '@/components/Media-center/Vedio'
import StayUpdated from '@/components/Media-center/StayUpdated'
import GalleryModal from '@/components/Media-center/GalleryModal'
import GridImages from '@/components/Media-center/GridImages'
import GridCards from '@/components/Media-center/GridCards'
import Dimonds from '@/components/Media-center/Dimonds'
import LatestNews from '@/components/Media-center/LatestNews'
import NewsCard from '@/components/Media-center/NewsCard'
import NavigationArrows from '@/components/Media-center/NavigationArrows'
import DateCategoryInfo from '@/components/Media-center/DateCategoryInfo'

const dummyNews = [
    {
        date: "24 JUL 2025",
        category: "Network",
        title: "Company Announces Major Expansion Plans",
        description:
            "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. . ", image: lastNewImg,
        link: "#",
    },
    {
        date: "24 JUL 2025",
        category: "Corporate",
        title: "Corporate Strategy Update Announced",
        description:
            "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. .",
        image: lastNewImg,
        link: "#",
    },
    {
        date: "24 JUL 2025",
        category: "Events",
        title: "Upcoming Events for 2025",
        description:
            "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. .",
        image: lastNewImg,
        link: "#",
    },
    {
        date: "24 JUL 2025",
        category: "Events",
        title: "Upcoming Events for 2025",
        description:
            "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. . ",
        image: lastNewImg,
        link: "#",
    },
    {
        date: "24 JUL 2025",
        category: "Events",
        title: "Upcoming Events for 2025",
        description:
            "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. . ",
        image: lastNewImg,
        link: "#",
    },
    {
        date: "24 JUL 2025",
        category: "Events",
        title: "Upcoming Events for 2025",
        description:
            "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. . ",
        image: lastNewImg,
        link: "#",
    },
];
const SlugMediaClient = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [template, setTemplate] = useState(2)
    const newsInfo = {
        date: "2024/1/4",
        category: "Network",
        mainImage: "",
        title: "Company Announces Major Expansion Plans",
        content:

            "Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur",
        gallery: [
            { id: 1, image: c1, format: "PNG" },
            { id: 2, image: c2, format: "PNG" },
        ],
        gridImages: [
            { id: 1, image: n1 },
            { id: 2, image: n2 },
            { id: 3, image: n3 },
            { id: 4, image: n4 },
            { id: 5, image: n5 }
        ]
    }
    const { title, content, gridImages, date, category } = newsInfo
    const handleOpenModal = (index) => {
        setStartIndex(index);
        setModalOpen(true);
    };
    const renderTemplate = () => {
        switch (template) {
            case 0:
                return <GridImages gridImages={gridImages} />;
            case 1:
                return <GridCards gridImages={gridImages} />;
            case 2:
                return <Dimonds gridImages={gridImages} />;
            default:
                return null;
        }
    };

    return (
        <MediaCenterLayout>
            <div className='mt-[50px]'>

                {/* ✅ Date & Category */}
                <DateCategoryInfo
                    date={date}
                    category={category}
                />

                {/* ✅ Main Image */}
                <Image
                    src={newsImg}
                    alt="newsImg"
                    width={800}
                    height={250}
                    className="rounded-xl w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />

                {/* ✅ Title */}
                <h2 className="w-full text-[#054E72] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-bold mt-4 sm:mt-5 mb-6 sm:mb-18">
                    {title}
                </h2>

                <div className="flex flex-col 2xl:flex-row ">

                    {/* ✅ Description */}
                    <p className="w-full 2xl:max-w-[50%] text-[#1B1F23] text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-6 sm:leading-7 md:leading-8 break-words mb-4 sm:mb-6 md:mb-8">
                        {content}
                    </p>
                    <div className="flex-1 relative ">
                        {renderTemplate()}
                    </div>
                </div>
                {/* ✅ 📸 GALLERY SECTION */}
                {template === 0 &&
                    <>
                        <Gallery gallery={newsInfo.gallery} handleOpenModal={handleOpenModal} />
                        <Vedio handleOpenModal={handleOpenModal} />
                    </>
                }
                <NavigationArrows />
                <h2 className="w-full text-[#054E72] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-bold mt-4 sm:mt-5 mb-6 sm:mb-18">
                    Related News
                </h2>

                <div className=" my-5 py-10 grid gap-5 md:gap-2 lg:gap-[52px]  grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 mx-auto">
                    {dummyNews.slice(0, 3).map((news, idx) => (
                        <NewsCard key={idx} info={news} />
                    ))}
                </div>
                <StayUpdated />
                {/* ✅ Modal */}
                <GalleryModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    gallery={newsInfo.gallery}
                    startIndex={startIndex}
                />

            </div>
        </MediaCenterLayout>
    )
}

export default SlugMediaClient
