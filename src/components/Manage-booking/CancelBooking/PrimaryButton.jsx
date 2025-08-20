const PrimaryButton = ({ children, className = '', ...props }) => (
    <button
        {...props}
        className={`inline-flex items-center justify-center px-5 py-2.5 rounded bg-primary-1 text-white text-sm font-semibold hover:opacity-95  ${className}`}
    >
        {children}
    </button>
);
export default PrimaryButton