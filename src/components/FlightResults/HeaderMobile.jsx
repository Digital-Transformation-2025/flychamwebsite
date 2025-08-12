'use client'
import { X } from '@phosphor-icons/react'
import React from 'react'
import RouteInfo from './RouteInfo'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setIsModifySearch } from '@/store/flightSlice'

const HeaderMobile = ({ handleStepBack }) => {
    const router = useRouter();
    const dispatch = useDispatch()
    const ModifySearchMobile = () => {
        dispatch(setIsModifySearch(true))
        router.push("/");
        setTimeout(() => {
            const searchWidget = document.getElementById('search-widget');
            if (searchWidget) {
                searchWidget.scrollIntoView({ behavior: 'smooth' });
            }
        }, 200);
    };

    return (
        <>

            {/* Left Arrow (like IconButton edge="start") */}
            <button
                className="text-[var(--Primary-1,#054E72)]"
                onClick={handleStepBack}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                    <path d="M13 4 7 10l6 6" stroke="currentColor" strokeWidth="2" />
                </svg>
            </button>


            <div className="flex flex-col items-center justify-center gap-1">

                <RouteInfo />
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
        </>
    )
}

export default HeaderMobile