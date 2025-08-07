'use client'
import useIsMobile from '@/hooks/useIsMobile';
import React from 'react';
import {
    AirplaneTilt, ArrowsClockwise, ArrowUDownLeft, Briefcase, BriefcaseIcon, CheckCircle,
    EyeSlash, ProhibitInset, SuitcaseIcon, SuitcaseSimple, XCircle
} from '@phosphor-icons/react';
import formatPrice from '@/util/formatePrice';
import { useMemo } from 'react';

const getIcon = (key) => {
    switch (key) {

        case "No-Show":
            return EyeSlash;
        case "Refund Before Departure":
        case "Changes or Refund Within 24 Hours":
            return ArrowUDownLeft;
        case "Checked baggage":
            return SuitcaseIcon;
        case "Hand baggage":
            return BriefcaseIcon;
        case "Excess Baggage":
            return SuitcaseSimple;
        case "Modification Before 24 Hours":
            return ArrowsClockwise;


        default:
            return null; // or a default icon
    }
};

const FeatureRow = ({ index, item, isLg, infoIcon, isInfo }) => {
    const {
        value, iconColor, label } = item;
    const InfoIcon = getIcon(label);

    return (
        <div
            style={{
                justifyContent: 'start',
            }}
            className="flex flex-row-reverse   lg:flex-row items-center gap-3 text-[#000] text-sm">
            {isInfo ?
                <>
                    {InfoIcon && isLg && <InfoIcon size={20} className={`text-[#000]`} />}
                    {label}
                </>
                :
                <>
                    {/* <Icon size={20} className={`${iconColor}`} /> */}
                    {isLg ? (
                        <div className='flex items-center justify-start gap-3'>
                            {(label === "Hand baggage" || label === "Checked baggage") &&
                                <CheckCircle color='#34C759' size={20} weight='bold' />
                            }
                            <span> {label === "No-Show" ? value.slice(0.7) : (value || "-")}</span>
                        </div>

                    ) : (
                        <span className="flex items-center gap-2">
                            <InfoIcon size={20} className={`text-[#000]`} />
                            {label + ": "}
                            {value || "-"}
                        </span>
                    )}


                </>
            }

            {/* {!isLg ? `${<InfoIcon size={20} />}${label}: ${value}` : value} */}
        </div>
    );
};






const InfoRows = ({ isHeader, isEconomy, isLg, isInfo, handleSelectPlan, col, flight }) => {
    const fareRules = col?.FareRuleReference || {};

    const ruleItems = Object.entries(fareRules).map(([label, value]) => ({
        label,
        value,
        // icon: Info,
        // infoIcon: Info,
        iconColor: "text-600",
    }));
    const staticItems = [
        {
            label: "Checked baggage",
            value: col.type === "Economy" ? "30 kg" : "40 Kg",
            icon: SuitcaseSimple,
            iconColor: "text-600",
        },
        {
            label: "Hand baggage",
            value: "1 piece, 7 kg",
            icon: Briefcase,
            iconColor: "text-600",
        },
    ];
    const items = [...staticItems, ...ruleItems];


    return (
        <div className="flex flex-col gap-3 w-full  self-start">
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <FeatureRow index={index} item={item} isLg={isLg} isInfo={isInfo} />
                    {index < items.length - 1 && (
                        <div className="h-px bg-300 " />
                    )}
                </React.Fragment>
            ))}
            {(isHeader) && (
                <button
                    onClick={(e) => handleSelectPlan(e, flight, col)}
                    className={`cursor-pointer mt-5 w-full py-3 text-sm font-semibold rounded-[6px] ${isEconomy
                        ? 'text-primary-1 border border-[var(--primary-1)] bg-white hover:!text-white hover:border-white hover:bg-[#054E72]'
                        : 'text-white bg-[var(--primary-1)]  hover:bg-[#013e5c] hover:border-primary'
                        }`}
                >
                    Select
                </button>
            )}

        </div>
    )
}
const Header = ({ tag, price, title, isEconomy, isHeader, isLg, currency }) => {

    console.log('currency', currency);

    // Don't show anything on mobile if not header
    if (!isHeader && !isLg) {
        return null;
    }

    // Show spacer only on large screens if not header
    if (!isHeader && isLg) {
        return <div className="h-[72px] px-4 py-2" />;
    }


    const bgColor = isEconomy ? 'bg-[rgba(var(--primary-1-rgb),0.2)]' : 'bg-primary-1';
    const textColor = isEconomy ? 'text-primary-1' : 'text-white';
    const textCurrencyColor = isEconomy ? 'text-black' : 'text-white';
    return (
        <div className={`relative flex items-center justify-between px-4 py-2 ${bgColor} rounded-tl-[8px] rounded-t-[8px]`}>
            <div>
                <span className={`text-sm font-semibold ${textColor}`}>{title}</span>

                <div className={` flex items-center gap-1 ${textCurrencyColor}`}>
                    <div className={`${textCurrencyColor} text-2xl font-regular`}>{price}</div>
                    <div className={`${textCurrencyColor} text-xs font-medium  `}>{currency}</div>
                </div>
            </div>

            {tag && (
                <span className="absolute right-0 top-0 bg-secondary-1 text-white text-[12px] p-2 font-semibold rounded-bl-[12px] rounded-tr-[8px]">
                    {tag}
                </span>
            )}
        </div>
    )
}

const FareColumn = ({
    title,
    price,
    seatsLeft,
    tag = '',
    type,
    isHeader,
    isLg, handleSelectPlan, col, flight
}) => {
    const c = flight.common_info.currency

    const isEconomy = type === 'Economy';
    const isInfo = type === 'Info';


    return (
        <div className=" w-full lg:max-w-[430px] flex flex-col  rounded-lg ">

            <Header currency={c} tag={tag} col={col} price={price} title={title} isEconomy={isEconomy} isHeader={isHeader} isLg={isLg} />

            {(isHeader && isLg) ? (
                <div className="text-alert px-2  text-xs font-medium text-end mb-2">
                    {seatsLeft}
                </div>
            ) : <div className="text-alert h-[16px] text-xs font-medium text-end mb-2">

            </div>}
            <InfoRows

                isHeader={isHeader}
                isEconomy={isEconomy}
                isInfo={isInfo}
                isLg={isLg}
                handleSelectPlan={handleSelectPlan}
                col={col}
                flight={flight}
            />
        </div>
    );
};

const FlightDetails = ({ handleSelectPlan, flight, activeTab }) => {
    const isLg = !useIsMobile(1024)
    const Economy = flight.Economy
    const Business = flight.Business
    const commonInfo = flight.common_info
    const buildPassengerInfo = (pricingInfo = []) =>
        pricingInfo.map(({ PaxType, BaseFare, TotalTax, TotalFees, TotalFare, Rules, FareBasisCodes, SegmentCode, ResBookDesigCode }) => ({
            PaxType,
            BaseFare,
            TotalTax,
            TotalFees,
            TotalFare,
            Rules,
            FareBasisCodes,
            SegmentCode,
            ResBookDesigCode
        }));


    const baseColumn = {
        commonInfo,
        isHeader: true,
        isBtn: true,
        special: false,
    };


    // inside FlightDetails component
    const seatsLeftEconomy = useMemo(
        () => `${Math.floor(Math.random() * 10) + 1} seats left`,
        [] // only calculate once per mount
    );
    const seatsLeftBusiness = useMemo(
        () => `${Math.floor(Math.random() * 10) + 1} seats left`,
        []
    );
    
    const columns = [
        {
            type: 'Info',
            FareRuleReference:
                Economy?.pricing_info?.[0]?.FareRuleReference?.[activeTab] ||
                Business?.pricing_info?.[0]?.FareRuleReference?.[activeTab],
            currency: commonInfo?.currency,
        },
        {
            ...baseColumn,
            id: 1,
            title: 'Economy Class',
            Economy,
            FareRuleReference:
                Economy?.pricing_info?.[0]?.FareRuleReference?.[activeTab],
            price: formatPrice(Economy?.total_fare),
            currency: commonInfo?.currency,
            seatsLeft: seatsLeftEconomy,
            type: 'Economy',
            PassengerInfo: buildPassengerInfo(Economy?.pricing_info),
        },
        {
            ...baseColumn,
            id: 2,
            title: 'Business Class',
            Business,
            FareRuleReference:
                Business?.pricing_info?.[0]?.FareRuleReference?.[activeTab],
            price: formatPrice(Business?.total_fare),
            currency: commonInfo?.currency,
            seatsLeft: seatsLeftBusiness,
            type: 'Business',
            tag: 'Recommended',
            PassengerInfo: buildPassengerInfo(Business?.pricing_info),
        },
    ];

    return (
        <div className="w-full  py-6 rounded-xl flex flex-col md:flex-row gap-6 justify-between items-end">

            <div className="flex flex-col lg:flex-row w-full   gap-4 flex-1">
                {isLg &&
                    <FareColumn {...columns[0]} col={columns[0]} isLg={isLg} handleSelectPlan={handleSelectPlan} flight={flight} />
                }
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                    <div className="flex flex-col lg:flex-row flex-1 justify-end gap-15">

                        {columns
                            .slice(1)
                            .filter((col) => {
                                if (col.type === 'Economy') return !!col.Economy;
                                if (col.type === 'Business') return !!col.Business;
                                return true;
                            })
                            .map((col, idx) => (
                                <FareColumn
                                    key={idx + 1}
                                    {...col}
                                    col={col}
                                    isLg={isLg}
                                    handleSelectPlan={handleSelectPlan}
                                    flight={flight}
                                />
                            ))}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightDetails; 