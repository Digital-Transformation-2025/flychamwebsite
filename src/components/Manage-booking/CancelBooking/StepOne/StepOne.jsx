import MutedButton from "./MutedButton"
import PolicyCard from "./PolicyCard"
import PrimaryButton from "./PrimaryButton"

const StepOne = ({handleClickBack}) => {
    return (
        <>
            <PolicyCard />
            <div className="my-4 flex items-center gap-3 justify-end">
                <MutedButton onClick={handleClickBack} className="!border-[#054E72] text-primary-1 px-10 py-3">
                    {'Cancel'}
                </MutedButton>
                <PrimaryButton onClick={handleClickBack} className="!border-primary-1 text-white px-10 py-3">
                    {'I agree'}
                </PrimaryButton>
            </div>
        </>

    )
}

export default StepOne