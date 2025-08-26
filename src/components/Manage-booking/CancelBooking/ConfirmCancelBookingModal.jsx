'use client';
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Warning, WarningCircle } from "@phosphor-icons/react/dist/ssr";

export default function ConfirmCancelBookingModal({ isOpen, onClose, onConfirm }) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[200]" onClose={onClose}>
                {/* Overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/80  backdrop-blur-xs" />
                </Transition.Child>

                {/* Modal */}
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
                        <Dialog.Panel className="w-full max-w-4xl transform rounded-xl bg-200 py-6 md:py-12 px-10 md:px-23 text-center shadow-lg transition-all ">

                            <Dialog.Title
                                as="h3"
                                className=""
                            >
                                <div className="flex flex-col md:flex-row items-center gap-2 mb-6 md:mb-0">

                                    <Warning weight="fill" className="text-secondary-1" size={36} />
                                    <span className="text-xl md:text-2xl font-semibold text-700">
                                        Are you sure you want to cancel this booking?
                                    </span>
                                </div>
                            </Dialog.Title>
                            <Dialog.Description className="mt-2 mb-16 text-sm md:text-lg font-medium text-700 text-center md:text-start">
                                Once you confirm the cancellation, your booking will no longer
                                be available. Refund will be processed in{" "}
                                <span className="font-semibold">20</span> working days
                            </Dialog.Description>

                            <div className="mt-6 flex flex-col-reverse sm:flex-row justify-center md:justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="w-full sm:w-auto rounded-md border border-primary-1 px-5 py-2 text-sm font-semibold text-primary-1 hover:bg-primary-1/5 transition"
                                >
                                    NO, Go Back
                                </button>
                                <button
                                    type="button"
                                    onClick={onConfirm}
                                    className="w-full sm:w-auto rounded-md bg-primary-1 px-5 py-2 text-sm font-semibold text-white hover:bg-[#043c56] transition"
                                >
                                    Yes, Cancel Booking
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
