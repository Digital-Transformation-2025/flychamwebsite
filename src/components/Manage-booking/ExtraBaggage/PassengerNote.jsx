import { Info } from '@phosphor-icons/react/dist/ssr';
import React from 'react'

const PassengerNote = ({ note }) =>
    note ? (
        <div className="mt-3 flex items-start gap-2 text-primary-1">
            <span className="mt-[2px]">
                <Info size={16} />
            </span>
            <span className="text-[12px]">{note}</span>
        </div>
    ) : null;


export default PassengerNote