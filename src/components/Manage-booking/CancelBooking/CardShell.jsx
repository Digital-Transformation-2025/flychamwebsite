const CardShell = ({ title, children }) => (
    <section className="bg-[#F7F7F6] rounded-md p-4 sm:p-5 border border-[#EAEAE8]">
        <h2 className="font-semibold text-[#1F2937] mb-3 text-[15px] sm:text-base">{title}</h2>
        {children}
    </section>
);
export default CardShell