import { Info } from "@phosphor-icons/react/dist/ssr";

const TravelAgencyAlert = () => {
    return (
        <div className="w-full bg-[#F9F4E6] px-4 py-3 my-10">
            <div className=" flex items-start gap-2">
                {/* Icon */}
                <Info
                    size={18}
                    weight="regular"
                    className="text-primary-1 mt-[2px] font-medium"
                />
                {/* Message */}
                <p className="text-sm md:text-[15px] text-primary-1 font-medium leading-relaxed">
                    This booking was made through a travel agency. For modifications or
                    cancellations, please contact your travel agent.
                </p>
            </div>
        </div>
    );
};

export default TravelAgencyAlert;
