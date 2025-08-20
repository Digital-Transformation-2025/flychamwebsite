const info = [
  'You can cancel at any time, provided you do so at least 6 hours before the scheduled departure.',
  'Cancellation fees may apply depending on your ticket type and fare conditions.',
  'Special promotions or discounted fares may have different cancellation rules.',
  'Refunds will be processed according to the fare rules of your ticket.',
  'Refunds will be issued to the original payment method.',
  'Your booking will be canceled once you submit your request.',
]
const PolicyCard = () => (
  <section className="relative rounded-lg bg-[#E9F1F5] p-4 sm:p-5 mb-5 overflow-hidden">
    {/* left accent bar (flush with edge) */}
    {/* <span
      aria-hidden
      className="absolute inset-y-0 left-0 w-[8px] bg-primary-1"
    /> */}
    {/* subtle inner divider to mimic the screenshot */}
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-[8px] w-px bg-[#CFE0E7]"
    />

    {/* title */}
    <h3 className="text-[16px] sm:text-[18px] font-semibold text-700 mb-2">
      Ensure you read and follow these steps carefully before completing your cancellation request:
    </h3>

    {/* bullets */}
    <ul className="mt-1 space-y-2 text-[13px] sm:text-[14px] leading-6 text-[#0F3C4A]">
      {info.map((text, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-primary-1" />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default PolicyCard;
