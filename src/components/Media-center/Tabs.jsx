import React from "react";

const Tabs = ({ activeTab, setActiveTab, tabs }) => {


    return (
        <div className="flex flex-wrap gap-3 mt-[67px] ">
            {tabs.map((tab, idx) => (
                <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`cursor-pointer px-4 py-2 rounded-lg font-montserrat text-sm font-medium transition 
            ${activeTab === idx
                            ? "bg-[#054E72] text-white"
                            : "bg-[#F5F5F4] text-[#054E72] hover:bg-[#e6e6e6]"
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
