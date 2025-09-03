"use client";
import React from "react";
import Image from "next/image";
import logoblue from "../../assets/images/logoblue.png";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter()
    const onclickLogo = () => {
        router.push('/')
    }
    return (
        <header className="w-full bg-[#F5F5F4] py-4  px-4 sm:px-6 md:px-15    flex justify-start items-center">
            <div
                onClick={onclickLogo}
                className="cursor-pointer w-[174px] flex justify-start items-center">
                <Image
                    src={logoblue}
                    alt="FlyCham Logo"
                    className="h-auto "
                    priority
                />
            </div>
        </header>
    );
};

export default Header;
