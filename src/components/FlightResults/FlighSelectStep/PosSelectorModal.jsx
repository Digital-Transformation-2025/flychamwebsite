'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X } from '@phosphor-icons/react';
import sy from "@/assets/images/flags/sy.png"
import ae from "@/assets/images/flags/ae.png"
import iq from "@/assets/images/flags/iq.png"
import kw from "@/assets/images/flags/kw.png"
import om from "@/assets/images/flags/om.png"
import Image from 'next/image';
import { useSelector } from 'react-redux';
import useFormattedFlightTimes from '@/hooks/useFormattedFlightTimes';
const getFlag = (posCode) => {
    const map = {
        KWI: kw,     // Kuwait
        BGW: iq,     // Baghdad (Iraq)
        SYD: sy,     // Syria - USD
        SYP: sy,     // Syria - SYP
        UAE: ae,     // Emirates
        MCT: om      // Muscat (Oman)
    };

    return map[posCode] || sy;
};
const PosSelectorModal = ({ isOpen, setIsOpen, handleSelectPos }) => {
    const { pos } = useSelector((s) => s.flights);
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-[#00000095]" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <Dialog.Title className="text-lg font-semibold text-primary-1">
                                        Select your point of sale
                                    </Dialog.Title>
                                    <p className="text-sm text-600">
                                        Choose your region to change local pricing
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Currency List */}
                            <div className="space-y-1">
                                {pos?.items?.filter((i)=>i.id!==7)?.map(({ id, posTranslations, posCode,currencyCode }) => {
                                    const name = posTranslations?.[0]?.name || posCode;

                                    return (
                                        <div
                                            key={id}
                                            onClick={() => handleSelectPos(id)}
                                            className="flex justify-between items-center py-2 px-2 border-b border-gray-200 hover:bg-gray-100 rounded-md cursor-pointer transition"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Image src={getFlag(posCode)} alt={name} className="w-6 h-4 rounded-sm" />
                                                <span className="text-sm text-gray-700">{name}</span>
                                            </div>
                                            <span className="bg-[#003A59] text-white text-xs font-medium px-3 py-1 rounded-full">
                                                {currencyCode}
                                            </span>
                                        </div>
                                    );
                                })}


                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default PosSelectorModal;
