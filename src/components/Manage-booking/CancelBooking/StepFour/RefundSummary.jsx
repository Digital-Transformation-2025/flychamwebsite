import PricingAccordion from "./PricingAccordion";

export default function RefundSummary() {
    const currency = "USD";

    const lines = [
        { label: "Ticket price", amount: 900 },
        { label: "Taxes", amount: -150 },
        { label: "Penalty", amount: -100 },
        { label: "Payment getaway fees", amount: -5 },
    ];
    const pricingInfo = [
        {
            type: "ADT",
            ticketPrice: " 900.00",
            taxes: " 150.00",
            pentaly: " 5.00",
            paymaneyGetwayFees: " 1,055.00",
        },
        {
            type: "CHD",
            ticketPrice: " 900.00",
            taxes: " 150.00",
            pentaly: " 5.00",
            paymaneyGetwayFees: " 1,055.00",
        },
        {
            type: "INF",
            ticketPrice: " 900.00",
            taxes: " 150.00",
            pentaly: " 5.00",
            paymaneyGetwayFees: " 1,055.00",
        },
    ]
    const total = lines.reduce((sum, { amount }) => sum + amount, 0);

    const Row = ({ label, amount, last = false }) => (
        <div className={`flex justify-between text-sm ${last ? "mb-4" : "mb-3"}`}>
            <span className="text-[#5F5F5C]">{label}</span>
            <span className={`flex gap-1 ${amount < 0 ? "text-[#B00300]" : "text-[#5F5F5C]"}`}>
                <span>{currency}</span>
                <span>{`${amount < 0 ? "-" : ""}${Math.abs(amount).toFixed(2)}`}</span>
            </span>
        </div>
    );

    return (
        <div className="w-full max-w-sm bg-[#FDFDFC] shadow-md rounded-xl p-5 font-montserrat relative">
            <h2 className="text-lg font-semibold text-black mb-6">Refund summary</h2>

            {/* {lines.map((l, i) => (
                <Row key={l.label} {...l} last={i === lines.length - 1} />
            ))} */}
            <PricingAccordion pricingInfo={pricingInfo} />
            <div className="border border-dashed border-t border-[#E5E5E3] my-4" />

            <div className="flex justify-between items-center mb-4">
                <span className="text-[#3E3E3B] text-[15px] font-medium">Net refund amount</span>
                <span className="flex gap-1 text-[#1E983D] font-semibold text-base">
                    <span>{currency}</span>
                    <span>{total.toFixed(2)}</span>
                </span>
            </div>

            <div className="bg-[#054E72]/10 rounded p-2.5 text-xs text-[#054E72]">
                {["Processing time: 20 days", "Refund method: Original payment card"].map((t) => (
                    <div key={t} className="flex items-center mb-1 last:mb-0">
                        <span className="w-1 h-1 rounded-full bg-[#054E72] mr-2"></span>
                        {t}
                    </div>
                ))}
            </div>
        </div>
    );
}
