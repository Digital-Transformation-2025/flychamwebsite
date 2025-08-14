'use client'
import { useState } from "react";

const FloatingInput = ({
    name,
    label,
    hint,
    icon,
    value,
    onChange,
    onBlur,
    touched,
    error,
}) => {
    const [focused, setFocused] = useState(false);
    const float = focused || String(value || "").length > 0;
    const hasError = !!(touched && error);

    return (
        <div className="relative flex-1 min-w-[260px]">
            <div
                className={`relative rounded-xl px-4 py-6 h-[104px] flex items-center bg-100 ${hasError ? "border-2 border-alert" : "border border-transparent"
                    }`}
            >
                {/* icon */}
                <div
                    className={`absolute left-4 top-1/2 -translate-y-1/2 ${hasError ? "text-alert" : "text-400"
                        }`}
                >
                    {icon}
                </div>

                {/* floating label */}
                <label
                    htmlFor={name}
                    className={`absolute left-10 transition-all duration-200 select-none ${float ? "top-5 text-[14px]" : "top-1/2 -translate-y-1/2 text-[16px]"
                        } ${hasError ? "text-alert" : "text-600"}`}
                >
                    {label}
                </label>

                {/* input */}
                <input
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={(e) => {
                        setFocused(false);
                        // onBlur?.(e);
                    }}
                    onFocus={() => setFocused(true)}
                    aria-invalid={hasError}
                    className="w-full bg-transparent outline-none pl-10 pt-4 text-[14px] text-black"
                    autoComplete="off"
                />

                {/* inline hint when empty */}
                {!float && hint ? (
                    <span className="absolute left-10 bottom-2 text-[12px] text-400">
                        {hint}
                    </span>
                ) : null}
            </div>

            {/* error text */}
            {hasError ? (
                <div className="mt-2 text-[12px] text-alert">{error}</div>
            ) : null}
        </div>
    );
};
export default FloatingInput