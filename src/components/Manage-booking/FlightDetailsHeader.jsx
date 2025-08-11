import { EnvelopeSimple, Printer } from "@phosphor-icons/react/dist/ssr";
import SectionTitle from "./SectionTitle";

const FlightDetailsHeader = () => {
    return (
        <div className="w-full py-2 mb-[100px]">
            <div className=" flex flex-wrap items-center gap-3">
                <div className="]">
                    <SectionTitle>  Flight details</SectionTitle>
                </div>


                {/* Actions */}
                <div className="flex items-center gap-3 text-sm">
                    {/* Email */}
                    <button className="flex items-center gap-1 text-primary-1 hover:underline">
                        <EnvelopeSimple size={16} weight="regular" />
                        Email
                    </button>

                    {/* Divider */}
                    <span className="h-5 w-px bg-[#D9D9D9]" />

                    {/* Print */}
                    <button className="flex items-center gap-1 text-primary-1 hover:underline">
                        <Printer size={16} weight="regular" />
                        Print
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlightDetailsHeader;
