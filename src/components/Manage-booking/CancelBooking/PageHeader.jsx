const PageHeader = ({ bookingRef }) => (
    <div className="mt-6 mb-4 flex flex-col md:flex-row md:items-start md:justify-between gap-2">
        <h1 className="text-[22px] sm:text-[24px] md:text-[28px] font-semibold text-[#1D1B20]">
            Cancel Booking & Refund
        </h1>
        <div className="text-xs sm:text-sm md:text-base text-600">
            Booking reservation: <span className="font-bold">{bookingRef}</span>
        </div>
    </div>
);
export default PageHeader