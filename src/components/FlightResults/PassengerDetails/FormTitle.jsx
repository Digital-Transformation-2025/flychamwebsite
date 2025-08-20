'use client'
import {
    User,
    Smiley,
    Baby,
    BabyCarriage,
} from "@phosphor-icons/react";
import React from "react";

const getIconByType = (type) => {
    switch (type.toLowerCase()) {
        case "adult":
            return User;
        case "child":
            return Baby;
        case "infant":
            return BabyCarriage;
        default:
            return User;
    }
};

const FormTitle = ({ type, idx }) => {
    const Icon = getIconByType(type);

    return (
        <div className="flex items-center gap-2 text-700 text-base font-semibold my-4">
            <Icon className="w-5 h-5 text-[var(--text-700)]" />
            <span>
                Passenger {idx + 1}{" "}
                <span className="text-700 capitalize">({type})</span>
            </span>
        </div>
    );
};

export default FormTitle;
