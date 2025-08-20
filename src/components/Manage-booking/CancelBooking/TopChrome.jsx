import useIsMobile from '@/hooks/useIsMobile';
import { X } from '@phosphor-icons/react/dist/ssr';

const TopChrome = ({ onClose }) => {
    const isMobile = useIsMobile()
    return (
        <div className="border-b border-[#EAEAE8]">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-6 h-12 md:h-14 flex items-center justify-end">


                {/* Right: language / auth + close */}
                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#5F5F5C]">
                    <button
                        onClick={onClose}
                        className="ml-2 sm:ml-4 p-2 rounded hover:bg-[#F5F5F4]"
                        aria-label="Close"
                    >
                        <X size={isMobile ? 16 : 24} />
                    </button>
                </div>
            </div>
        </div>
    );
}
export default TopChrome