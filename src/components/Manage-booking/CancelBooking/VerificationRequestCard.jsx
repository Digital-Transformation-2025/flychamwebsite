import CardShell from "./CardShell";
import PrimaryButton from "./PrimaryButton";

const VerificationRequestCard = ({ maskedPhone, onSend }) => (
    <CardShell title="Verification">
        <p className="text-[13px] sm:text-sm text-[#374151] mb-4">
            We will send a verification code via SMS to the mobile number ending with{' '}
            <span className="font-semibold">{maskedPhone}</span>. The code will expire in{' '}
            <span className="font-semibold">3 minutes</span>.
        </p>
        <div className="flex justify-center ">

            <PrimaryButton onClick={onSend} className=" ">Send the code</PrimaryButton>
        </div>
    </CardShell>
);
export default VerificationRequestCard