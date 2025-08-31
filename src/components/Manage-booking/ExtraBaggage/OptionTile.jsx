import { CheckCircle, SuitcaseRolling } from '@phosphor-icons/react/dist/ssr';
import React from 'react'
const OptionTile = ({ option, active, onSelect, disabled }) => {
    return (
        <button
            disabled={disabled}
            onClick={() => onSelect(option.id)}
            className={`relative w-full rounded-lg border-1 p-5 text-center transition ${active ? 'border-[#054E72] bg-[#054e7229]  ' : 'border-[#EAEAE8]'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FAFAF9]'}`}
        >
            <SuitcaseRolling size={28}
                color={active ? '#054E72' : '#5F5F5C'}
                weight='fill'
                className="mx-auto "
            />

            <div className={`mt-2 text-[14px] font-semibold ${active ? 'text-primary-1 font-semibold' : 'text-500 font-medium'}`}>
                +{option.kg}kg
            </div>
            <div className={`text-[12px] ${active ? 'text-primary-1 font-semibold' : 'text-500 font-medium'}`}>${option.price.toFixed(2)}</div>

            {active ? (
                <CheckCircle
                    weight="fill"
                    size={27}
                    className="absolute right-2 top-2"
                    color='#22C55E'
                />
            ) : (
                <span className="absolute right-2 top-2 h-[14px] w-[14px] rounded-full border border-[#D6D6D3]" />
            )}
        </button>
    );
};

export default OptionTile