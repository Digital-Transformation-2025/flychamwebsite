const MutedButton = ({ children, className = '', ...props }) => (
    <button
        {...props}
        className={`inline-flex items-center justify-center px-5 py-2.5 rounded border border-[#D6D6D3] text-sm text-[#374151] hover:bg-[#F5F5F4] ${className}`}
    >
        {children}
    </button>
);
export default MutedButton