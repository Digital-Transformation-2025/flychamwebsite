// Step Component
const Step = ({ currentStep }) => (
    <div className="flex items-start flex-col-reverse justify-start gap-2 w-full max-w-xs  mb-4">
        <div className="w-full bg-[#D9D9D9] rounded-full h-2">
            <div
                className="bg-primary-1 h-2 rounded-full"
                style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
        </div>
        <div className="text-sm md:text-lg text-nowrap text-primary-900 font-medium">Step {currentStep} of 4</div>
    </div>
);
export default Step