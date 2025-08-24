import useIsMobile from "@/hooks/useIsMobile";
import { Info } from "@phosphor-icons/react/dist/ssr";

const TravelAgencyAlert = () => {
    const isMobile = useIsMobile();
    const iconSize = isMobile ? 20 : 18; // bigger icon on mobile

    return (
        <div className="w-full bg-secondary-100  px-4 py-3 mb-8 mt-10 sm:mt-40 md:mt-10 lg:mt-8 rounded-md">
            <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="flex-shrink-0 flex items-start justify-center   rounded-full">
                    <Info
                        size={iconSize}
                        weight="regular"
                        className="text-primary-900"
                    />
                </div>

                {/* Message */}
                <p className="text-sm md:text-md text-primary-900 font-medium leading-relaxed">
                    This booking was made through a travel agency. For modifications or
                    cancellations, please contact your travel agent.
                </p>
            </div>
        </div>
    );
};

export default TravelAgencyAlert;
