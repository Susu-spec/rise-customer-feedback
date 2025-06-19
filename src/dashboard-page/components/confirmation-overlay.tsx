import { RiEmotionHappyFill } from "@remixicon/react";

type FeedbackConfirmationProps = {
    handleClose: () => void
}

export default function ConfirmationOverlay({ handleClose }: FeedbackConfirmationProps) {

    return (
        <div className={`max-h-fit w-full 
                min-w-[40.375rem] max-h-[19.5rem] 
                rounded-2xl bg-[#F9FAFB] 
                flex flex-col gap-[2.25rem]
                pt-[3.75rem]`}>
            <div className="flex flex-col items-center gap-3 px-6">
                <RiEmotionHappyFill size={40} color="#0898A0"/>
                <div className="flex flex-col items-center gap-3">
                    <p className="text-2xl font-semibold text-black">
                        Thank you for your feedback
                    </p>
                    <p className="text-sm text-[#555B64]">
                        We have received your feedback! Our team will attend to it.
                    </p>
                </div>
            </div>
            <div className="py-[1.75rem] px-6 rounded-b-2xl w-full bg-white border-t border-t-[#EAECF0] flex gap-[.625rem]">
                <button 
                    type="button"
                    onClick={handleClose}
                    className="py-[.875rem] rounded-4xl w-full bg-[#F3F4F6] font-semibold text-[#006D79]">
                    Close
                </button>
            </div>
        </div>
    )
}