'use client';
import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from '@phosphor-icons/react';
import useFormattedFlightTimes from '@/hooks/useFormattedFlightTimes';
import FlightSegmentDetails from './FlightSegmentDetails';
import Divider from './Divider';


const FlightDetailsModal = ({ flight, isOpen, onClose }) => {
    console.log('flight', flight);

    const { stops, } = useFormattedFlightTimes(flight);
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment}>
                    <div className="fixed inset-0 bg-[#00000095]" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child as={Fragment}>
                            <Dialog.Panel className="w-[610px] rounded-2xl bg-white p-6 shadow-xl">
                                {/* Header */}
                                <div className="flex justify-between items-center mb-4">

                                    <Dialog.Title className="text-[18px] font-semibold text-[#111827]">
                                        Flight details
                                    </Dialog.Title>

                                    <button onClick={onClose}><X size={20} /></button>
                                </div>
                                <Divider />

                                {flight?.common_info?.segments?.map((s, index) => (
                                    <FlightSegmentDetails
                                        key={index}
                                        origin={{ city: s.origin_city }}
                                        destination={{ city: s.destination_city }}
                                        arrivalDate={s.arrival_date}
                                        departureDate={s.departure_date}

                                        duration={s.Duration}
                                        stops={stops}
                                        departureTime={s.departure_time}
                                        arrivalTime={s.arrival_time}
                                        departureAirport={s.origin_name}
                                        arrivalAirport={s.destination_name}
                                        flightNumber={s.FlightNumber}
                                    />
                                ))}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default FlightDetailsModal;
