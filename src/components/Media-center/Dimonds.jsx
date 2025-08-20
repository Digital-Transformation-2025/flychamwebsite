import React from 'react'
import DiamondImage from './DiamondImage'

const Dimonds = ({ gridImages }) => {
    return (
        <div className='flex gap-0 justify-center 2xl:justify-end'>
            <div className="flex flex-col flex-wrap justify-center gap-4 relative left-[40px]">
                {gridImages.slice(0, 3).map((img, index) => (
                    <DiamondImage key={index} src={img.image} />
                ))}
            </div>
            <div className="flex flex-col flex-wrap justify-center gap-4 relative right-[40px]">
                {gridImages.slice(3, 5).map((img, index) => (
                    <DiamondImage key={index} src={img.image} />
                ))}
            </div>
        </div>
    )
}

export default Dimonds
