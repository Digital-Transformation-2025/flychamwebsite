'use client'
import Cover from '@/components/Media-center/Cover'
import coverImg from "../../assets/images/Media-center/cover.png"
import lastNewImg from "../../assets/images/Media-center/lastNewImg.png"
import NewsCard from '@/components/Media-center/NewsCard'
import Tabs from '@/components/Media-center/Tabs'
import { useState } from 'react'
import ViewAllBtn from '@/components/Media-center/ViewAll'
import Resources from '@/components/Media-center/Resources'
import StayUpdated from '@/components/Media-center/StayUpdated'
import { useRouter } from 'next/navigation'
import LatestNews from '@/components/Media-center/LatestNews'
import MediaCenterLayout from '@/components/Ui/MediaCenterLayout'

const dummyNews = [
    {
        date: "24 JUL 2025",
        category: "Network",
        title: "Company Announces Major Expansion Plans",
        description:
            "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. .",
        image: lastNewImg,
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
const tabs = [
    "All topic",
    "Corporate",
    "Network",
    "Sponsorships",
    "Events",
    "Customer experience"
];
const MediaCenter = () => {
    const [activeTab, setActiveTab] = useState(0);
    const router = useRouter()
    const handleClickViewAll = () => {
        router.push("/latest-news")
    }

    return (
        <div className=''>
            <Cover coverImg={coverImg} title=" Media center" disc="Your source for news, press releases, and travel updates" />
            <LatestNews
                lastNews={{
                    date: "24 JUL 2025",
                    category: "Network",
                    title: "Company Announces Major Expansion Plans",
                    description:
                        "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus...",
                    image: lastNewImg,
                    link: "/news/major-expansion",
                }}
            />
            <MediaCenterLayout
            >


                {/* ✅ Tabs */}

                <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* ✅ News Grid */}

                <div className=" my-5 py-10 grid gap-5 md:gap-2 lg:gap-[52px]  grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 max-w-[1300px] mx-auto">
                    {dummyNews.map((news, idx) => (
                        <NewsCard key={idx} info={news} />
                    ))}
                </div>

                {/* ✅ View All Button */}
                <div className="my-5">
                    <ViewAllBtn onClick={handleClickViewAll} />
                </div>


                {/* Resources */}
            </MediaCenterLayout>
            <div className="my-6  ">

                <Resources />
            </div>
            <div className="px-4 md:px-8 lg:px-50 ">
                <StayUpdated />
            </div>

        </div>
    );
};


export default MediaCenter