import React from "react";
import { Plus, Minus, PlusCircle } from "@phosphor-icons/react";

const GUEST_OPTIONS = [
    { label: "Adults", sub: "+12 Years", key: "adults" },
    { label: "Children", sub: "2 - 11 years", key: "children" },
    { label: "Infants", sub: "Under 2 years", key: "infants" },
];

const CLASS_OPTIONS = ["Economy", "Business"];

const Guests = ({ formik, values, isMobile, isResultsPage }) => {
    const { type, adults, infants
    } = values
    const handleGuestChange = (key, delta) => {

        const currentValue = formik.values[key];

        if (key === "adults") {
            const newValue = Math.min(9, Math.max(1, currentValue + delta));
            formik.setFieldValue("adults", newValue);

            // If infants > new adults, reduce infants
            if (formik.values.infants > newValue) {
                formik.setFieldValue("infants", newValue);
            }
            return;
        }

        if (key === "children") {
            const newValue = Math.min(9, Math.max(0, currentValue + delta));
            formik.setFieldValue("children", newValue);
            return;
        }

        if (key === "infants") {
            const maxInfants = formik.values.adults;
            const newValue = Math.min(maxInfants, Math.max(0, currentValue + delta));
            formik.setFieldValue("infants", newValue);
        }
    };


    return (
        <div className="flex flex-col md:flex-row justify-between gap-12 px-2 py-6 md:px-8   bg-white rounded-2xl">
            {/* Guests Section */}
            <div className="flex-1">
                <div className="flex justify-between items-center ">
                    <h3 className="text-[16px] mb-4">Guests</h3>
                    {isMobile && (
                        <div className="flex items-center gap-3">
                            {CLASS_OPTIONS.map((option) => (
                                <label key={option} className="flex items-center gap-1 text-sm  text-800 font-medium">
                                    <input
                                        type="radio"
                                        name="cabinClass"
                                        value={option}
                                        checked={formik.values.cabinClass === option}
                                        onChange={() => formik.setFieldValue("cabinClass", option)}
                                        className="accent-primary-1"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    )}

                </div>

                {GUEST_OPTIONS.map(({ label, sub, key }) => {
                    const totalGuests = formik.values.adults + formik.values.children + formik.values.infants;

                    const minusEnabled = key === "adults" ? formik.values[key] > 1 : formik.values[key] > 0;
                    const plusDisabled =
                        totalGuests >= 9 || // ✅ NEW RULE: max total guests 9
                        (key === "adults" && formik.values.adults >= 9) ||
                        (key === "children" && formik.values.children >= 9) ||
                        (key === "infants" && formik.values.infants >= formik.values.adults);

                    return (
                        <div
                            key={key}
                            className="flex items-center justify-between bg-[#F5F5F5] px-6 py-3 rounded-xl mb-3"
                        >
                            <div>
                                <p className="text-[14px] font-semibold text-gray-800">{label}</p>
                                <p className="text-[12px] text-gray-500">{sub}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* ➖ Minus Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // ✅ prevent closing dropdown
                                        handleGuestChange(key, -1);
                                    }} disabled={!minusEnabled}
                                    className={`w-8 h-8 flex items-center justify-center rounded-[4px] transition 
                        ${minusEnabled ? "bg-primary-1 cursor-pointer" : "bg-[#D9D9D9] opacity-50 cursor-not-allowed"}`}
                                >
                                    <Minus
                                        size={12}
                                        weight="bold"
                                        className={"text-white"}
                                    />
                                </button>

                                <input
                                    type="number"
                                    value={formik.values[key]}
                                    onChange={(e) => {
                                        const parsed = parseInt(e.target.value) || 0;
                                        const value =
                                            key === "adults" ? Math.max(1, parsed) : Math.max(0, parsed);
                                        formik.setFieldValue(key, value);
                                    }}
                                    className="w-10 h-8 text-center border border-gray-400 rounded-md text-sm font-medium focus:outline-none custom-number-input"
                                    style={{
                                        appearance: "textfield",
                                        WebkitAppearance: "none",
                                        MozAppearance: "textfield",
                                        textAlign: "center",
                                    }}
                                />

                                {/* ➕ Plus Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // ✅ prevent closing dropdown
                                        handleGuestChange(key, 1);
                                    }} disabled={plusDisabled}
                                    className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition 
                        ${plusDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-primary-1 cursor-pointer"}`}
                                >
                                    <Plus
                                        size={12}
                                        weight="bold"
                                        className={"text-white"}
                                    />
                                </button>
                            </div>
                        </div>
                    );
                })}


                {adults === infants
                    &&
                    <p className="text-alert text-sm">{`You can book for max ${adults} Infant`}</p>
                }

            </div>

            {/* Class & Promo Section */}
            {!isMobile && !isResultsPage &&

                <div className="flex-1">
                    <h3 className="text-[16px] mb-4">Class</h3>
                    {CLASS_OPTIONS.map((option) => (
                        <label
                            key={option}
                            className="flex items-center justify-between bg-[#F5F5F5] px-6 py-[14px] rounded-xl mb-3 cursor-pointer"

                        >
                            <span className="text-[14px] text-800 font-medium">
                                {option}
                            </span>

                            <span
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition
        ${formik.values.cabinClass === option ? 'border-[var(--primary-1)]' : 'border-gray-400'}`}
                            >
                                {formik.values.cabinClass === option && (
                                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary-1)]"></span>
                                )}
                            </span>

                            <input
                                type="radio"
                                name="cabinClass"
                                checked={formik.values.cabinClass === option}
                                onChange={() => formik.setFieldValue("cabinClass", option)}
                                className="hidden"
                            />
                        </label>
                    ))}

                    <div className="mt-7 relative w-full group">
                        {/* Icon on the left */}
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-primary-1 pointer-events-none transition-opacity duration-200 group-focus-within:opacity-0">
                            <PlusCircle size={16} weight="bold" />
                        </span>

                        {/* Label */}
                        <label
                            htmlFor="promoCodeInput"
                            className={`absolute left-7 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 transition-all 
      group-focus-within:top-0 group-focus-within:text-xs group-focus-within:text-primary-1
      ${formik.values.promoCode ? 'top-0 text-xs text-primary-1' : ''}`}
                        >
                            Promo Code
                        </label>

                        {/* Input */}
                        <input
                            id="promoCodeInput"
                            type="text"
                            value={formik.values.promoCode}
                            onChange={(e) => formik.setFieldValue("promoCode", e.target.value)}
                            className="w-full pl-7 pr-2 pt-5 pb-1 border-b-2 border-gray-300 focus:border-primary-1 outline-none text-sm text-gray-800 placeholder-transparent"
                            placeholder="Promo Code"
                        />
                    </div>



                </div>
            }

        </div>
    );
};

export default React.memo(Guests);;
