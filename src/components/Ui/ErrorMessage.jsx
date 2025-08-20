import { Info } from '@phosphor-icons/react';

const ErrorMessage = ({ error }) => (
    typeof error === 'string' && error.trim() !== '' ? (
        <div className="mt-1 flex items-center justify-start gap-2">
            <Info size={18} className="text-alert" />
            <p className="text-sm text-alert">{error }</p>
        </div>
    ) : null
);

export default ErrorMessage;
