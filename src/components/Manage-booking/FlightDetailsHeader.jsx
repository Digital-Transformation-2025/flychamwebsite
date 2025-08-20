import { EnvelopeSimple, Printer } from "@phosphor-icons/react/dist/ssr";
import SectionTitle from "./SectionTitle";

const FlightDetailsHeader = ({ isTraveleAgent }) => {
    return (
        <div className={`w-full py-2 mt-[150px] md:mt-8  mb-[40px] ${!isTraveleAgent && 'mt-10'}`}>
            <div className="flex flex-wrap items-center justify-between md:justify-start gap-3">

                {/* Title */}
                <div className="flex items-center gap-3">
                    <SectionTitle>Flight details</SectionTitle>
                    <span className="hidden md:block h-6 w-px bg-black" /> {/* Divider */}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 text-sm">
                    {/* Email */}
                    <button
                        disabled
                        className="!cursor-not-allowed flex items-center gap-1 text-primary-500 ">
                        <EnvelopeSimple size={16} weight="regular" />
                        Email
                    </button>

                    {/* Divider */}
                    <span className="h-5 w-px bg-primary-1" />

                    {/* Print */}
                    <button
                        disabled
                        className=" !cursor-not-allowed flex items-center gap-1 text-primary-500 ">
                        <Printer size={16} weight="regular" />
                        Print
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlightDetailsHeader;
