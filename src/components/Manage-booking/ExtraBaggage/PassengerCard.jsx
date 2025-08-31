import { User } from '@phosphor-icons/react/dist/ssr';
import React from 'react'
import PassengerNameRow from './PassengerNameRow';
import PassengerChip from './PassengerChip';
import PassengerBaggageLines from './PassengerBaggageLines';
import PassengerNote from './PassengerNote';

const PassengerCard = ({
    passenger,
    active,
    onSelect,
    selectedKg,
    onClear,
    onSelectClick
}) => {
    const disabled = passenger.disabled;

    return (
        <button
            type="button"
            onClick={() => !disabled && onSelect?.(passenger.id)}
            className={[
                'w-full rounded-lg border-2  p-6 text-start transition',
                active
                    ? 'border-[#054E72]'
                    : 'border-[#E5E5E3]',
                disabled ? 'opacity-60 cursor-not-allowed' : ' hover:bg-[#FAFAF9]',
            ].join(' ')}
        >
            <div className="flex items-start gap-2 w-full">
                <User size={20} className="text-primary-1 mt-[2px]" />

                <div className="flex-1">
                    <PassengerNameRow
                        name={passenger.name}
                        type={passenger.type}
                        chip={<PassengerChip show={active} selectedKg={selectedKg} />}
                    />

                    <PassengerBaggageLines
                        handKg={passenger.handKg}
                        checkedKg={passenger.checkedKg}
                        hand={passenger.hand}
                        checked={passenger.checked}
                    />
                    {passenger.type !== 'Infant' &&
                        <p
                            onClick={onSelectClick}
                            className='text-[12px] font-semibold text-primary-1 underline w-full  flex md:hidden justify-end cursor-pointer '>Select</p>
                    }
                    {/* <div className="mt-3 h-px w-full bg-[#EAEAE8]" /> */}
                </div>
            </div>

            <PassengerNote note={passenger.note} />
        </button>
    );
};

export default PassengerCard