'use client'
import { ArrowsOutSimple, CornersOut, DownloadSimple, ImageSquare, Link } from '@phosphor-icons/react'
import Image from 'next/image'
import React from 'react'

const Gallery = ({ gallery, handleOpenModal  }) => {
    return (
        <div className="flex gap-4 mt-6 mb-5">
            {gallery.map((item, index) => (
                <div
                    key={item.id}
                    className={`relative group rounded-xl overflow-hidden gap-5 ${index === 0 ? 'flex-[0.6]' : 'flex-[0.4]'
                        }`}
                >
                    {/* Image */}
                    <Image
                        src={item.image}
                        alt={`gallery-${item.id}`}
                        className="w-full h-[400px] object-cover rounded-xl transition-transform duration-300 "
                    />

                    {/* ✅ Hover Overlay */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between rounded-xl">
                        {/* 🔝 Top Right Fullscreen Icon */}
                        <div className="flex justify-end p-2">
                            <button
                                onClick={() => handleOpenModal(index)} 

                                className="bg-gradient-to-t from-black/100 to-black/50 p-2 rounded-full ">
                                <CornersOut size={20} weight="bold" className="text-[#FFF] cursor-pointer" />
                            </button>
                        </div>

                        {/* 🔻 Bottom Info Bar */}
                        <div className="flex justify-between items-center bg-gradient-to-t from-black/100 to-black/50 p-3 rounded-b-xl">
                            {/* PNG Label */}
                            <div
                                className="flex items-center gap-2">
                                <ImageSquare size={20} weight="bold" className="text-[#FFF]" />

                                <span className="text-xs text-white font-medium">PNG</span>
                            </div>

                            {/* Download Button */}
                            <button className="flex items-center gap-1 text-white hover:underline">
                                <Link size={18} className='cursor-pointer' />
                                <DownloadSimple size={18} className='cursor-pointer' />

                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Gallery
