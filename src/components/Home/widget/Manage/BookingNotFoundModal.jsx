'use client';

import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Info, X } from '@phosphor-icons/react';

const BookingNotFoundModal = ({ open, onClose, title, description, isBtn }) => {
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={onClose}>
                {/* Backdrop */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-120"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50" />
                </Transition.Child>

                {/* Centered panel */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 scale-95 translate-y-2"
                            enterTo="opacity-100 scale-100 translate-y-0"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100 scale-100 translate-y-0"
                            leaveTo="opacity-0 scale-95 translate-y-2"
                        >
                            <Dialog.Panel className="relative w-[620px] max-w-[92vw] rounded-xl bg-white shadow-[0_14px_40px_rgba(0,0,0,0.20)]">
                                {/* Close */}
                                <button
                                    aria-label="Close"
                                    onClick={onClose}
                                    className="absolute right-4 top-4 text-[#8A8A87] hover:text-[#5F5F5C] transition"
                                >
                                    <X size={16} weight="bold" />
                                </button>

                                {/* Content spacing matches reference: p-6 md:p-7 */}
                                <div className="p-6 md:p-7">
                                    {/* Title row */}
                                    <div className="flex items-start gap-3">
                                        {/* red dot */}
                                        <Info size={24} color='#B00300' weight='fill' />


                                        {/* title + text */}
                                        <div className="flex-1">
                                            <Dialog.Title className="font-medium text-[16px] leading-5 text-800">
                                                {title}
                                            </Dialog.Title>

                                            <Dialog.Description className="mt-2 text-[18px] leading-6 text-[#5F5F5C]">

                                                {description}
                                            </Dialog.Description>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    {isBtn &&

                                        <div className="mt-6 flex justify-end">
                                            <button
                                                onClick={onClose}
                                                className="flex items-end justify-end rounded-lg bg-primary-1 px-12 py-3 text-[16px] font-semibold text-[#FDFDFC] hover:opacity-90"
                                            >
                                                Back to home
                                            </button>
                                        </div>
                                    }
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default BookingNotFoundModal;
