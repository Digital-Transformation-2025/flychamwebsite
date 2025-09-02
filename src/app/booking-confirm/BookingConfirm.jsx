'use client'
import React, { useEffect, useState } from 'react';
import { EnvelopeSimple, Clock, DownloadSimple, ArrowLeft, DownloadSimpleIcon } from '@phosphor-icons/react';
import logoEn from "@/assets/images/logoEn.png"
import Image from 'next/image';
import FlightTimeInfo from '@/components/FlightResults/FlightTimeInfo';
import { useDispatch, useSelector } from 'react-redux';
import mask from "@/assets/images/mask.png"
import check from "@/assets/images/check.png"
import Divider from '@/components/FlightResults/FlighSelectStep/Divider';
import { downloadTickeyService, getBySessionIdService } from '@/store/Services/flightServices';
import { useRouter, useSearchParams } from 'next/navigation';
import Screen from '@/components/Ui/Screen';
import useFormattedFlightTimes from '@/hooks/useFormattedFlightTimes';
import useIsMobile from '@/hooks/useIsMobile';
import formatTime from '@/util/formatFlightTime';
import LottieComponent from '@/components/Ui/LottieComponent';
import { setFormikData, setSearchParams } from '@/store/flightSlice';

const BookingConfirm = () => {
    const dispatch = useDispatch();
    const { selectedFlight,
        sessionInfo,
        selectedPlan, pnr } = useSelector((s) => s.flights);
    // 🔹 Dummy sessionInfo for testing UI without API
    // const sessionInfo = {
    //     contact: {
    //         firstName: "John",
    //         lastName: "Doe",
    //         phoneNumber: "+1 555 123 4567",
    //         email: "john.doe@example.com"
    //     },
    //     passengers: [
    //         { id: 1, name: "John Doe" },
    //         { id: 2, name: "Jane Doe" },
    //         { id: 3, name: "Mike Doe" }
    //     ],
    //     pnr: "PNR12345",
    //     baseFareAmount: "500 USD",
    //     paymentAmount: 621.74,
    //     taxes: [
    //         { id: 1, taxCode: "TOTALTAX", amount: 36.74, currency: "USD" }
    //     ],
    //     fees: [
    //         { id: 1, feeCode: "TOTALFEE", amount: 85, currency: "USD" }
    //     ],
    //     segments: [
    //         {
    //             id: 101,
    //             flightNumber: "EK202",
    //             departureAirportCode: "DXB",
    //             arrivalAirportCode: "LHR",
    //             departureDateTime: "2025-08-10T10:00:00",
    //             arrivalDateTime: "2025-08-10T14:00:00",
    //             terminal: "T3",
    //             cabinClass: "Economy",
    //             status: "Confirmed",
    //             rph: "001",
    //             comment: "On time"
    //         }
    //     ]
    // };
    // const info = [
    //     {
    //         label: "Name",
    //         value: "John Doe"
    //     },
    //     {
    //         label: "Passengers",
    //         value: 3
    //     },
    //     {
    //         label: "Contact",
    //         value: "+1 555 123 4567"
    //     },
    //     {
    //         label: "Email",
    //         value: "john.doe@example.com"
    //     },
    //     {
    //         label: "Booking reference",
    //         value: "PNR12345"
    //     },
    //     {
    //         label: "Flight number",
    //         value: "EK202"
    //     }
    // ];

    const isXl = useIsMobile(1280);
    const isLg = useIsMobile(1078);
    const isMd = useIsMobile(768);
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { duration, stops } = useFormattedFlightTimes(selectedFlight);

    useEffect(() => {
        if (sessionId) {
            dispatch(getBySessionIdService(sessionId))
                .catch(() => setError(true))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
            setError(true);
        }
    }, [dispatch, sessionId]);

    if (loading) return <LottieComponent />;
    if (error || !sessionInfo || !sessionInfo.contact) {
        return <p className="text-center text-alert font-semibold mt-10">Something went wrong. Please try again later.</p>;
    }


    const info = [
        {
            label: "Name",
            value: `${sessionInfo?.contact?.firstName ?? ''} ${sessionInfo?.contact?.lastName ?? ''}`
        },
        {
            label: "Passengers",
            value: sessionInfo?.passengers?.length ?? 0
        },
        {
            label: "Contact",
            value: ("+" + sessionInfo?.contact?.countryCode + "-" + sessionInfo?.contact?.areaCode + "-" + sessionInfo?.contact?.mobileNumber) ?? '-'
        },
        {
            label: "Email",
            value: sessionInfo?.contact?.email ?? '-'
        },
        {
            label: "Booking reference",
            value: sessionInfo?.pnr ?? '-'
        },
        {
            label: "Flight number",
            value: sessionInfo?.segments?.[0]?.flightNumber ?? '-'
        }
    ];
    const router = useRouter()
    const handleClickHome = () => {
        router.push("/")
        dispatch(setSearchParams(null))
        dispatch(setFormikData(null))
    }
    const getTaxesAndFees = (taxes = [], fees = []) => {
        const totalTaxes = taxes.reduce((sum, t) => sum + (t.amount || 0), 0);
        const totalFees = fees.reduce((sum, f) => sum + (f.amount || 0), 0);
        const currency = taxes[0]?.currency || fees[0]?.currency || '';
        const total = totalTaxes + totalFees;
        return `${total.toFixed(2)} ${currency}`;
    };

    const handkeDownloadTicket = () => {
        dispatch(downloadTickeyService({
            SessionId: sessionId,
            PNR: sessionInfo?.pnr
        })).then((action) => {
            if (downloadTickeyService.fulfilled.match(action)) {
                const { fileUrl } = action.payload;

                if (fileUrl) {
                    window.open(fileUrl, '_self');
                }
            }
        })
    }

    return (
        <div className="w-full max-w-[1200px] mx-auto bg-white py-4 px-4 flex flex-col items-center">
            {/* ✅ Header */}
            <div className="flex flex-col items-center mb-10 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Image src={check} alt="check" />
                </div>
                <h1 className="text-2xl font-bold text-primary-1 mb-1">Booking confirmed</h1>
                <p className="text-lg text-600">Thank you for your payment</p>
            </div>

            {/* ✅ Booking Card */}
            <div className="max-h-[1200px] shadow-lg rounded-[20px] overflow-hidden relative mb-6 w-full">
                {/* Top Header of Card */}
                <div className="flex justify-between items-start bg-100 px-3 py-4 text-primary-1">
                    <Image src={logoEn} alt="Logo" />
                    <div className="flex justify-end items-center gap-2 p-[12px_15px] bg-primary-1 rounded-[8px]">
                        <span className="text-white text-xs font-semibold px-3 py-1">
                            { sessionInfo?.segments?.[0]?.cabinClass ==='Y' ? 'Economy' : 'Busniess'}
                        </span>
                    </div>
                </div>

                {/* ✅ Responsive Main Content */}
                <div className="flex flex-col md:flex-row">
                    {/* Left Section - 40% */}
                    <div className="md:basis-[30%] flex flex-col justify-between bg-50 relative p-4">
                        {sessionInfo?.segments?.map((s, idx) => {
                            const departureTime = s?.departureDateTime?.split("T")[1] ?? "-";
                            const arrivalTime = s?.arrivalDateTime?.split("T")[1] ?? "-";
                            const segment = {
                                id: s?.id,
                                flightNumber: s?.flightNumber,
                                origin_code: s?.departureAirportCode,
                                destination_code: s?.arrivalAirportCode,
                                departure_time: departureTime,
                                arrival_time: arrivalTime,
                                terminal: s?.terminal,
                                cabinClass: s?.cabinClass,
                                status: s?.status,
                                rph: s?.rph,
                                comment: s?.comment
                            };
                            return (
                                <FlightTimeInfo
                                    key={s?.id || idx}
                                    s={segment}
                                    idx={idx}
                                    flight={selectedFlight}
                                    isLg={isLg}
                                    isMd={isMd}
                                    isXl={isXl}
                                />
                            );
                        })}

                        {/* Info Box */}
                        <div className="flex flex-col sm:flex-row justify-between bg-[#A6CFE04D] rounded-lg px-2 py-3 mt-6 text-sm text-500 gap-3 sm:gap-0">
                            <div className="flex items-start gap-2">
                                <EnvelopeSimple size={24} />
                                <span className="text-[12px] text-500">
                                    We’ve sent your booking confirmation to your email
                                </span>
                            </div>
                            <div className="hidden sm:block border-l border-gray-300 h-5 self-center mx-4" />
                            <div className="flex items-start gap-2">
                                <Clock size={24} />
                                <span className="text-[12px] text-500">
                                    Please arrive at the airport at least 3 hours before departure
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - 60% */}
                    <div className="md:basis-[70%] bg-white p-6 flex flex-col justify-between">
                        <div className="grid grid-cols-1 gap-y-4 text-sm">
                            {info
                                .reduce((acc, curr, index) => {
                                    if (index % 2 === 0) {
                                        acc.push([curr]);
                                    } else {
                                        acc[acc.length - 1].push(curr);
                                    }
                                    return acc;
                                }, [])
                                .map((pair, idx) => (
                                    <div key={idx} className="grid grid-cols-2 gap-x-6">
                                        {pair.map(({ label, value }, i) => (
                                            <div key={i}>
                                                <div className={`text-gray-500`}>{label}</div>
                                                <div className={`${(label === "Booking reference" || label === "Flight number") ? 'text-primary-1 font-medium ' : 'text-black font-medium break-words'}`}>{value}</div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* ✅ Payment Summary stays full width */}
            <div className="w-full border shadow-md border-[#FDFDFC] rounded-[20px] py-6 px-4 mb-6">
                <h3 className="text-sm font-semibold mb-4">Payment Summary</h3>
                <div className="flex justify-between text-sm mb-2 text-600">
                    <span> Base fare</span>
                    <span>{(sessionInfo?.baseFareAmount + " " + sessionInfo?.paymentCurrency) ?? '-'}</span>
                </div>
                <div className="flex justify-between text-sm mb-2 text-600">
                    <span>Taxes & fees</span>
                    <span>{getTaxesAndFees(sessionInfo?.taxes, sessionInfo?.fees)}</span>
                </div>
                <Divider />
                <div className="flex justify-between text-sm font-semibold text-primary-1 mb-2">
                    <span>Total Paid</span>
                    <span>{sessionInfo?.paymentAmount + " " + sessionInfo?.taxes[0]?.currency ?? '-'}</span>
                </div>
            </div>

            {/* ✅ Buttons stack on mobile */}
            <div className="flex flex-col-re sm:flex-row gap-4 w-full sm:w-auto">
                <button
                    onClick={handleClickHome}
                    className="cursor-pointer flex items-center justify-center gap-2 border border-primary-1 text-primary-1 px-5 py-2 rounded-md font-medium transition-all duration-300 ease-in-out hover:!bg-[#054E72] hover:!text-white"
                >
                    <ArrowLeft size={18} />
                    Back to Home Page
                </button>

                <button
                    onClick={handkeDownloadTicket}
                    className="cursor-pointer flex items-center justify-center gap-2 border border-primary-1 text-primary-1 px-5 py-2 rounded-md font-medium transition-all duration-300 ease-in-out hover:!bg-[#054E72] hover:!text-white"
                >
                    <DownloadSimpleIcon size={18} />
                    Download Ticket
                </button>
            </div>
        </div>

    );
};

export default BookingConfirm;