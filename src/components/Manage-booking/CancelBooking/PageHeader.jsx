const PageHeader = ({ bookingRef = '' }) => (
    <div className="mt-6 mb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-2">
        <h1 className="text-[22px] sm:text-[24px] md:text-4xl font-semibold text-[#1D1B20]">
            Cancel Booking & Refund
        </h1>
        <div className="  text-600">
            <span className="font-medium text-[14px] md:text-lg">       Booking reservation:</span> <span className="font-bold text-[16px] md:text-lg">{bookingRef}</span>
        </div>
    </div>
);
export default PageHeader