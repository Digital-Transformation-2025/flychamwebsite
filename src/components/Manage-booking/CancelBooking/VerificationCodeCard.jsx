import CardShell from "./CardShell";
import MutedButton from "./MutedButton";
import PrimaryButton from "./PrimaryButton";


const VerificationCodeCard = ({
    code,
    setCode,
    timeLeftLabel,
    onEmailResend,
    onSmsResend,
    onVerify,
}) => (
    <CardShell title="Verification">
        <p className="text-[13px] sm:text-sm text-[#374151] mb-3">
            A verification code has been sent — check your device.
        </p>

        {/* Code + timer: stack on mobile, inline on larger screens */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
            <input
                inputMode="numeric"
                pattern="\d*"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full sm:w-40 md:w-44 text-center tracking-[6px] text-[18px] font-semibold py-2.5 rounded border border-[#D6D6D3] outline-none"
                placeholder="••••••"
                aria-label="Verification code"
            />
            <span className="text-xs sm:text-[13px] text-[#6B7280]">{timeLeftLabel}</span>
        </div>

        <div className="text-[13px] sm:text-sm text-[#6B7280] mb-3">
            Didn’t receive the code? Resend via:
        </div>

        {/* Resend buttons: stack on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-5">
            <PrimaryButton onClick={onEmailResend} className="w-full sm:w-auto">Email</PrimaryButton>
            <MutedButton onClick={onSmsResend} className="w-full sm:w-auto">SMS</MutedButton>
        </div>

        {/* Verify: full-width on mobile, fixed width on larger */}
        <div>
            <button
                onClick={onVerify}
                className="w-full sm:w-44 h-11 rounded bg-[#A89565] text-[#3D3B35] font-semibold hover:opacity-95"
            >
                Verify
            </button>
        </div>
    </CardShell>
);
export default VerificationCodeCard