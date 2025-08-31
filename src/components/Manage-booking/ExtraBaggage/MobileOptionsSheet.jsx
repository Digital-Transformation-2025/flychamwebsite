import { X } from '@phosphor-icons/react/dist/ssr';
import React from 'react'
import OptionTile from './OptionTile';
const SectionLabel = ({ children }) => (
    <div className="text-[16px] md:text-[18px] font-medium text-800">{children}</div>
);

const MobileOptionsSheet = ({
    open,
    onClose,
    options,
    selectedId,
    onSelect,
    disabled,
}) => {
    if (!open) return null;

    return (
        <div className="md:hidden fixed inset-0 z-[120]">
            {/* dim background */}
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            {/* sheet */}
            <div className="absolute inset-x-0 bottom-0 max-h-[70vh] rounded-t-2xl bg-white p-4 shadow-[0_-12px_30px_rgba(0,0,0,0.18)] animate-sheet-up">
                <div className="flex items-center justify-between mb-2">
                    <SectionLabel>Chose extra baggage</SectionLabel>
                    <button onClick={onClose} className="p-2 -mr-2" aria-label="Close">
                        <X size={16} />
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-1" style={{ maxHeight: '58vh' }}>
                    {options.map((o) => (
                        <OptionTile
                            key={o.id}
                            option={o}
                            active={o.id === selectedId}
                            onSelect={(id) => {
                                onSelect(id);
                                // onClose();
                            }}
                            disabled={disabled}
                        />
                    ))}
                </div>
            </div>

            {/* inline keyframes for the slide-up */}
            <style jsx>{`
        @keyframes sheet-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-sheet-up { animation: sheet-up 1000ms  }
      `}</style>
        </div>
    );
};

export default MobileOptionsSheet