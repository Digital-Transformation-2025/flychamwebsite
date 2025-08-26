export default function RefundSummary() {
  return (
    <div className="w-full max-w-sm bg-[#FDFDFC] shadow-md rounded-xl p-5 font-montserrat relative">
      {/* Title */}
      <h2 className="text-lg font-semibold text-black mb-6">Refund summary</h2>

      {/* Ticket price */}
      <div className="flex justify-between mb-3 text-sm">
        <span className="text-[#5F5F5C]">Ticket price</span>
        <span className="flex gap-1 text-[#5F5F5C] font-medium">
          <span>USD</span>
          <span>900.00</span>
        </span>
      </div>

      {/* Taxes */}
      <div className="flex justify-between mb-3 text-sm">
        <span className="text-[#5F5F5C]">Taxes</span>
        <span className="flex gap-1 text-[#B00300]">
          <span>USD</span>
          <span>-150.00</span>
        </span>
      </div>

      {/* Penalty */}
      <div className="flex justify-between mb-3 text-sm">
        <span className="text-[#5F5F5C]">Penalty</span>
        <span className="flex gap-1 text-[#B00300]">
          <span>USD</span>
          <span>-100.00</span>
        </span>
      </div>

      {/* Payment getaway fees */}
      <div className="flex justify-between mb-4 text-sm">
        <span className="text-[#5F5F5C]">Payment getaway fees</span>
        <span className="flex gap-1 text-[#B00300]">
          <span>USD</span>
          <span>-5.00</span>
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-[#E5E5E3] my-4"></div>

      {/* Net refund amount */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-[#3E3E3B] text-[15px] font-medium">
          Net refund amount
        </span>
        <span className="flex gap-1 text-[#1E983D] font-semibold text-base">
          <span>USD</span>
          <span>645.00</span>
        </span>
      </div>

      {/* Info box */}
      <div className="bg-[#054E72]/10 rounded p-2.5 text-xs text-[#054E72]">
        <div className="flex items-center mb-1">
          <span className="w-1 h-1 rounded-full bg-[#054E72] mr-2"></span>
          Processing time: 20 days
        </div>
        <div className="flex items-center">
          <span className="w-1 h-1 rounded-full bg-[#054E72] mr-2"></span>
          Refund method: Original payment card
        </div>
      </div>
    </div>
  );
}
