import Image from 'next/image'
import React from 'react'

const DiamondImage = ({ src, className }) => {
    return (
        <div
            className={`w-70 h-70  2xl:w-70 2xl:h-70 overflow-hidden   ${className}`}
            style={{
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            }}
        >
            <Image
                src={src}
                alt="grid"
                width={300}
                height={300}
                className="w-full h-full object-cover"
            />
        </div>
    )
}

export default DiamondImage