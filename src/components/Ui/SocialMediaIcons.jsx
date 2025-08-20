import React from 'react'
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PiThreadsLogo } from "react-icons/pi";
const SocialMediaIcons = () => {
    return (

        <div className="flex justify-center  gap-4 text-primary-1 text-xl">
            {[
                <PiThreadsLogo
                    onClick={() => {
                        window.open(
                            'https://www.threads.com/@fly.cham',
                            '_blank'
                        );
                    }}
                />,
                //  <FaTiktok />
                //  ,
                <FaInstagram
                    onClick={() => {
                        window.open(
                            'https://www.instagram.com/fly.cham/',
                            '_blank'
                        );
                    }}
                />, <FaFacebookF onClick={() => {
                    window.open(
                        'https://www.facebook.com/people/%D9%81%D9%84%D8%A7%D9%8A-%D8%B4%D8%A7%D9%85-Fly-Cham/61575817032233/',
                        '_blank'
                    );
                }} />,
                // <FaYoutube />
                // ,
                <FaLinkedinIn
                    onClick={() => {
                        window.open(
                            'https://www.linkedin.com/company/fly-cham/',
                            '_blank'
                        );
                    }}
                />,
                <FaXTwitter
                    onClick={() => {
                        window.open(
                            'https://x.com/fly_cham',
                            '_blank'
                        );
                    }}
                />,
                //  <FaTelegramPlane />
            ].map((Icon, index) => (
                <div

                    key={index}
                    className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border-2 border-primary-1 text-primary-1 hover:opacity-80 transition"
                >
                    {Icon}
                </div>
            ))}
        </div>
    )
}

export default SocialMediaIcons