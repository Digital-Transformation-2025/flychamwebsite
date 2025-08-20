'use client'
import Image from 'next/image'
import DiamondImage from './DiamondImage'

const GridImages = ({ gridImages }) => {
    return (
        <div className="relative w-[350px] h-[350px] mx-auto my-30 xl:my-30">
            {/* Center Diamond */}
            <DiamondImage
                src={gridImages[2].image}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />

            {/* Top Left */}
            <DiamondImage
                src={gridImages[0].image}
                className="absolute top-[6%] left-[6%] -translate-x-1/2 -translate-y-1/2"
            />

            {/* Top Right */}
            <DiamondImage
                src={gridImages[1].image}
                className="absolute top-[6%] right-[6%] translate-x-1/2 -translate-y-1/2"
            />

            {/* Bottom Left */}
            <DiamondImage
                src={gridImages[3].image}
                className="absolute bottom-[6%] left-[6%] -translate-x-1/2 translate-y-1/2"
            />

            {/* Bottom Right */}
            <DiamondImage
                src={gridImages[4].image}
                className="absolute bottom-[6%] right-[6%] translate-x-1/2 translate-y-1/2"
            />
        </div>
    )
}



export default GridImages
