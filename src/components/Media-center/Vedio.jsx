'use client'
import { CornersOut, DownloadSimple, FilmSlate, Link } from '@phosphor-icons/react'
import React from 'react'

const Vedio = ({ handleOpenModal }) => {
    return (
        <div className="relative group rounded-xl overflow-hidden flex-[0.6] mb-5 xl:mb-[66px]">
            {/* 🎥 Video */}
            <video
                autoPlay
                muted          // ✅ Required for autoplay
                playsInline    // ✅ Prevents fullscreen on iOS Safari
                loop           // ✅ Optional (replay automatically)
                className="w-full h-[400px] object-cover rounded-xl transition-transform duration-300"
            >
                <source src="/videos/NewsVideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* ✅ Hover Overlay */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between rounded-xl">

                {/* 🔝 Top Right Fullscreen Icon */}
                <div
                    onClick={handleOpenModal}

                    className="flex justify-end p-2">
                    <button className="bg-gradient-to-t from-black/100 to-black/50 p-2 rounded-full ">
                        <CornersOut size={20} weight="bold" className="text-white cursor-pointer" />
                    </button>
                </div>

                {/* 🔻 Bottom Info Bar */}
                <div className="flex justify-between items-center bg-gradient-to-t from-black/100 to-black/50 p-3 rounded-b-xl">
                    {/* 🎞 Video Label */}
                    <div className="flex items-center gap-2">
                        <FilmSlate size={20} weight="bold" className="text-white" />
                        <span className="text-xs text-white font-medium">MP4</span>
                    </div>

                    {/* 📥 Download Button */}
                    <button className="flex items-center gap-1 text-white hover:underline">
                        <Link size={18} className='cursor-pointer' />
                        <DownloadSimple size={18} className='cursor-pointer' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Vedio
