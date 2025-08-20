'use client'
import { X } from '@phosphor-icons/react'
import React from 'react'
import RouteInfo from './RouteInfo'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setIsModifySearch } from '@/store/flightSlice'
import { CaretLeft } from '@phosphor-icons/react/dist/ssr'

const HeaderMobile = ({ handleStepBack, handleOpenModifySearch }) => {
    const router = useRouter();
    const dispatch = useDispatch()
    const ModifySearchMobile = () => {
        handleOpenModifySearch()
        // dispatch(setIsModifySearch(true))
        // router.push("/");
        // setTimeout(() => {
        //     const searchWidget = document.getElementById('search-widget');
        //     if (searchWidget) {
        //         searchWidget.scrollIntoView({ behavior: 'smooth' });
        //     }
        // }, 200);
    };

    return (
        <div className='flex justify-between w-full px-8'>

            {/* Left Arrow (like IconButton edge="start") */}
            <button
                className="text-[var(--Primary-1,#054E72)]"
                onClick={handleStepBack}
            >
                <CaretLeft size={20} />


            </button>


            <div className="flex flex-col items-center justify-center gap-3">

                <RouteInfo isMobileHeader />
                <span
                    onClick={ModifySearchMobile}
                    className="text-secondary-1 cursor-pointer text-sm  font-bold underline break-words">
                    Modify search
                </span>
            </div>
            <button
                onClick={() => router.back()}
                className="text-[var(--Primary-1,#054E72)]"
            >
                <X size={20} />
            </button>
        </div>
    )
}

export default HeaderMobile