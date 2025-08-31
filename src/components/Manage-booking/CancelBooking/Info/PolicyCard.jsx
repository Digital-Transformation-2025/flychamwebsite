import { useSelector } from "react-redux";

const info = [
  'You can cancel at any time, provided you do so at least 6 hours before the scheduled departure.',
  'Cancellation fees may apply depending on your ticket type and fare conditions.',
  'Special promotions or discounted fares may have different cancellation rules.',
  'Refunds will be processed according to the fare rules of your ticket.',
  'Refunds will be issued to the original payment method.',
  'Your booking will be canceled once you submit your request.',
]

const PolicyCard = () => {
  const { rules } = useSelector((s) => s.manageBook)
  return (
    <section className="relative rounded-lg bg-[#E9F1F5] p-4 sm:p-8 mb-5 overflow-hidden">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[0px] w-[5px] bg-primary-1"
      />

      {/* title */}
      <h3 className="text-[16px] sm:text-[18px] font-semibold text-700 mb-5">
        Ensure you read and follow these steps carefully before completing your cancellation request:
      </h3>

      {/* bullets */}
      <ul className="mt-1 space-y-3 text-[13px] sm:text-[14px] leading-6 text-primary-1">
        {rules.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-[6px] h-2 w-2 md:h-2.5 md:w-2.5 flex-shrink-0 rounded-full bg-primary-1"></span>
            <span className="text-sm sm:text-base">{item.rule}</span>
          </li>
        ))}
      </ul>

    </section>
  );
}

export default PolicyCard;
