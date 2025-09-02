'use client';
import React from 'react';

const Input = ({
  id = 'floating-input',
  type = 'text',
  label = 'Input',
  placeholder = ' ',
  value,
  onChange,
  name,
  className = '',
  error,
  ...props
}) => {
  const hasError = Boolean(error);

  return (
    <div className="relative w-full ">
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={hasError}
        className={`  h-14 md:h-auto peer block w-full bg-100 rounded-md   px-4 pt-6 pb-2 text-sm  placeholder-transparent focus:outline-none focus:ring-0
          ${hasError
            ? 'border border-alert text-alert focus:!border-alert'
            : 'border-gray-300 text-gray-600 focus:!border-[var(--primary-1)]'}
          ${className}`}
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute top-0 start-0 px-4 pt-[18px] text-sm    truncate pointer-events-none transition duration-100 ease-in-out origin-[0_0] h-full
          peer-disabled:opacity-50 peer-disabled:pointer-events-none
          peer-focus:scale-90 peer-focus:-translate-y-2
          peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:-translate-y-2
          ${hasError ? 'text-alert' : 'text-gray-600'}
          peer-focus:text-[var(--primary-1)]
    peer-focus:text-xs peer-not-placeholder-shown:text-xs
           peer-not-placeholder-shown:text-[var(--primary-1)]`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
