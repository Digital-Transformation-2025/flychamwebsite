'use client'
import React from "react";

import Input from "../Ui/Input";
import SocialMediaIcons from "../Ui/SocialMediaIcons";

const StayUpdated = () => {
    return (
        <section className="w-full bg-white py-12 ">
            <h2 className="text-primary-1 text-[28px] md:text-[32px]  font-bold mb-2">
                Stay updated
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                {/* ✅ LEFT SIDE: Subscription Form */}
                <div className="w-full md:max-w-[425px]">

                    <p className="text-[#3E3E3B] text-base  font-medium mb-6">
                        Subscribe to receive latest updates
                    </p>
                    {/* Email */}

                    <Input
                        id={`firstName`}
                        name={`firstName`}
                        label="Email address*"
                    // value={values.firstName}
                    // onChange={onChange}
                    // error={isTouched('firstName') && getError('firstName')}

                    />

                    {/* First + Last name */}
                    <div className="flex gap-4 my-4">
                        <Input
                            id={`firstName`}
                            name={`firstName`}
                            label="First name*"
                        // value={values.firstName}
                        // onChange={onChange}
                        // error={isTouched('firstName') && getError('firstName')}

                        />
                        <Input
                            id={`firstName`}
                            name={`firstName`}
                            label="Last name*"
                        // value={values.firstName}
                        // onChange={onChange}
                        // error={isTouched('firstName') && getError('firstName')}

                        />

                    </div>

                    <p className="text-[#3E3E3B] text-sm  mb-4">
                        receive exclusive offers and new deals straight to your inbox.
                    </p>

                    <button className="w-full sm:w-[217px] px-6 py-3 bg-primary-1 rounded-lg text-white text-[16px]  font-semibold hover:bg-primary-700 transition">
                        Subscribe
                    </button>
                </div>

                {/* ✅ RIGHT SIDE: Contact Info + Social Media */}
                <div className="flex flex-col gap-4">
                    <p className="text-700 text-base  font-medium">
                        For media inquiries, contact our media team at:
                    </p>
                    <a
                        href="mailto:Media@flycham.com"
                        className="text-primary-1 text-base  font-medium underline"
                    >
                        Media@flycham.com
                    </a>

                    <p className="text-700 text-base  font-medium mt-4">
                        Follow us on
                    </p>
                    <SocialMediaIcons />
                </div>
            </div>
        </section>
    );
};

export default StayUpdated;
