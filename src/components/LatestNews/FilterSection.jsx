import React from "react";
import CustomDropdown from "../Ui/TitleDropdown";

const FilterSection = () => {
    const months = [
        { label: "All month", value: "" },
        { label: "January", value: "01" },
        { label: "February", value: "02" },
        { label: "March", value: "03" },
        { label: "April", value: "04" },
        { label: "May", value: "05" },
        { label: "June", value: "06" },
        { label: "July", value: "07" },
        { label: "August", value: "08" },
        { label: "September", value: "09" },
        { label: "October", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" },
    ];

    const years = [
        { label: "All year", value: "" },
        { label: "2025", value: "2025" },
        { label: "2024", value: "2024" },
        { label: "2023", value: "2023" },
    ];

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5 max-w-xl mt-[78px]">
            {/* Label */}
            <span className="text-sm font-medium text-black">Filter by:</span>

            {/* Dropdowns */}
            <div className="flex gap-3 w-full ">
                <CustomDropdown
                    onChange={(value) => console.log("Selected month:", value)}
                    options={months}
                    placeholder="All month"
                />
                <CustomDropdown
                    onChange={(value) => console.log("Selected year:", value)}
                    options={years}
                    placeholder="All year"
                />
            </div>
        </div>
    );
};

export default FilterSection;
