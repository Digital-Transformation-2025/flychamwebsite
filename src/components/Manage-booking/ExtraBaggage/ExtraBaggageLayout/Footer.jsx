"use client";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-[#f8f8f8] border-t px-4 py-4">
      {/* Desktop layout */}
      <div className="hidden md:flex items-center justify-between max-w-5xl mx-auto">
        {/* Cancel */}
        <button className="px-4 py-2 border border-[#0C3C4A] text-[#0C3C4A] rounded-md hover:bg-gray-100 transition">
          Cancel
        </button>

        {/* Total + Continue */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm text-gray-600">Total for all passengers</p>
            <p className="text-lg font-semibold">USD 10</p>
          </div>
          <button className="px-6 py-2 rounded-md bg-[#bda778] text-white font-medium hover:bg-[#a89565] transition">
            Continue to next flight
          </button>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex flex-col md:hidden items-center gap-3 text-center">
        {/* Total */}
        <p className="text-sm text-gray-600">Total for all passengers</p>
        <p className="text-lg font-semibold">USD 10</p>

        {/* Continue */}
        <button className="w-full py-3 rounded-md bg-[#bda778] text-white font-medium hover:bg-[#a89565] transition">
          Continue to next flight
        </button>

        {/* Cancel */}
        <button className="text-[#0C3C4A] text-sm underline">Cancel</button>
      </div>
    </div>
  );
};

export default Footer;
