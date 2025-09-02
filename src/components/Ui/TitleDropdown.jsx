'use client'
import { useEffect, useRef, useState } from "react";

export default function CustomDropdown({
  selected,
  onChange,
  options = [],
  placeholder = "Select", type, error = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (value) => {
    onChange(value);
    setQuery("");
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    (opt.label || "").toLowerCase().includes(query.toLowerCase()) ||
    (opt.value || "").toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && type === "countries") {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isOpen, type]);
  return (
    <div className="relative w-full rounded-md  bg-100" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className={`h-14 md:h-auto w-full px-4 py-3  text-left  hover:cursor-pointer  relative ${error ? 'border border-alert' : 'border-gray-300'}`}
      >
        <span className={`text-[14px]  ${error ? 'text-alert' : 'text-600'}`}>
          {selected
            ? options.find((o) => o.value === selected)?.label || selected
            : placeholder}
        </span>
        <svg
          className={`w-4 h-4 absolute top-1/2 right-3 transform -translate-y-1/2 ${error ? 'text-alert' : 'text-600'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 9l-7 7-7-7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute w-full mt-1 bg-100 rounded-md  z-100  max-h-72 overflow-auto">
          {type === "countries" &&
            <input
              ref={inputRef} // ⬅️ attach ref here
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 text-sm border-b border-gray-300 focus:outline-none"
              placeholder="Search country or code"
            />
          }

          <ul>
            {filteredOptions.map((opt) => (
              <li
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`px-4 py-2 text-sm hover:bg-[#054E72] hover:text-white ${selected === opt.value ? "bg-[#054E72] text-white" : "text-gray-700"
                  } cursor-pointer`}
              >
                {opt.label}
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="px-4 py-2 text-sm text-gray-500">No matches found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
