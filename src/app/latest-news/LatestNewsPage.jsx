'use client'
import Cover from '@/components/Media-center/Cover'
import coverImg from "../../assets/images/Media-center/cover.png"
import lastNewImg from "../../assets/images/Media-center/lastNewImg.png"
import Tabs from '@/components/Media-center/Tabs'
import { useState } from 'react'
import LatestNews from '@/components/Media-center/LatestNews'
import FilterSection from '@/components/LatestNews/FilterSection'
import Divider from '@/components/FlightResults/FlighSelectStep/Divider'
import NewsCard2 from '@/components/LatestNews/NewsCaed2'


const tabs = [
    "All topic",
    "Corporate",
    "Network",
    "Sponsorships",
    "Events",
    "Customer experience"
];
const dummyNews = [
    {
        date: "24 JUL 2025",
        category: "Network",
        title: "Company Announces Major Expansion Plans",
        description:
"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. . ",        image: lastNewImg,
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
const LatestNewsPage = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className=''>
            <Cover coverImg={coverImg} title="Latest news" />

            <div className='px-4 md:px-8 lg:px-50 '>
                <FilterSection />
                <Divider />
                {/* ✅ Tabs */}
                <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="mt-[64px] mb-[31px] current-date">
                    2025
                </div>
                <div className="mt-6 space-y-6">
                    {dummyNews.map((news, idx) => (
                        <>
                            <NewsCard2 key={idx} info={news} />
                            <div className="w-full my-2 h-px bg-[var(--bg-200)]" />
                        </>

                    ))}
                </div>

            </div>


        </div>
    );
};


export default LatestNewsPage