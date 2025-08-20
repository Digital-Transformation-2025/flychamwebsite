'use client'
import { X } from "@phosphor-icons/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const SearchInput = ({ search, placeholder, handleSearch, type, values, airPorts }) => {
  const { source, destenations } = values
  const inputRef = useRef(null);
  // Get selected airport ID dynamically from `values`
  const selectedAirportId = values?.[type]; // either values.source or values.destination
  const selectedAirport = airPorts.find((a) => a.id === selectedAirportId);
  const selectedAirportName = selectedAirport?.airPortTranslations?.[0]?.airPortName ?? "";

  const displayValue = selectedAirportName || search;

  useEffect(() => {
    inputRef.current?.focus();

    // Auto-select text when a value exists
    if (search && values?.[type]) {
      inputRef.current?.select();
    }
  }, [search]);
  return (
    <div className="rounded-t-2xl py-6">

      <div className="flex items-center border-b border-gray-300">
 
        <input
          ref={inputRef}
          type="text"
          value={search ? search : displayValue}
          onChange={(e) => handleSearch(e.target.value, type)}

          placeholder={placeholder}
          className="w-full text-gray-700 placeholder-gray-400 text-[16px] px-0 py-2 focus:outline-none"
        />
        {search && (
          <button
            onClick={() => {

              handleSearch('', type);
            }}
            className="cursor-pointer text-gray-700 hover:text-black text-sm px-2"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
