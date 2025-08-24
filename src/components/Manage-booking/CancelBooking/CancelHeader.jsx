"use client";
import React from "react";
import Image from "next/image";
import logoblue from "../../../assets/images/logoblue.png";
import { useRouter } from "next/navigation";

const CancelHeader = () => {
    const router = useRouter()
    const onclickLogo = () => {
        router.push('/')
    }
    return (
        <header className=" bg-[#F5F5F4]   flex justify-start items-center w-full  mx-auto ">
            <div
                onClick={onclickLogo}
                className="cursor-pointer  flex justify-start items-center max-w-7xl w-full  mx-auto md:px-6 pb-2">
                <Image
                    src={logoblue}
                    alt="FlyCham Logo"
                    className="h-auto w-[140px]"
                    priority
                />
            </div>
        </header>
    );
};

export default CancelHeader;
