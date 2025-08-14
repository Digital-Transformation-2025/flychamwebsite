'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { Warning } from '@phosphor-icons/react';
import FromToSelector from '../Home/FromToSelector';
import BookingBox from '../Home/BookingBox';
import useIsMobile from '@/hooks/useIsMobile';

const ModifySearchModal = ({ isOpen, onClose, pos, airPorts, handleResetToFirstStep, setSelectedFlight }) => {
    const router = useRouter();
    const isMobile = useIsMobile()

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50 " onClose={onClose}>
                {/* Backdrop */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    leave="ease-in duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/80" />
                </Transition.Child>

                {/* Centered Panel */}
                <div className={`fixed inset-0 flex justify-center ${!isMobile && 'p-4  '} items-start  ${!isMobile && 'md:mt-30'}`}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        leave="ease-in duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className={`w-full max-w-7xl rounded-xl ${!isMobile && 'p-6'}   text-center shadow-xl transition-all`}>

                            <div className="flex justify-center gap-4">
                                <BookingBox pos={pos} flights={airPorts} isResultsPage handleResetToFirstStep={handleResetToFirstStep}
                                    onCloseMidifySearch={onClose}
                                    setSelectedFlight={setSelectedFlight}
                                />

                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ModifySearchModal;
