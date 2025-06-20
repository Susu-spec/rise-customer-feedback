import { RiEmotionHappyFill } from "@remixicon/react";

type FeedbackConfirmationProps = {
    handleClose: () => void
}

export default function ConfirmationOverlay({ handleClose }: FeedbackConfirmationProps) {

    return (
        <div className={`w-full max-w-[90dvw] sm:min-w-[40.375rem] 
                max-h-full sm:max-h-fit 
                rounded-2xl bg-[#F9FAFB] 
                flex flex-col gap-[2.25rem]
                pt-[3.75rem]`}>
            <div className="flex flex-col items-center gap-3 px-6">
                <RiEmotionHappyFill size={40} color="#0898A0"/>
                <div className="flex flex-col items-center gap-3">
                    <p className="text-xl sm:text-2xl font-semibold text-black text-center">
                        Thank you for your feedback
                    </p>
                    <p className="text-xs sm:text-sm text-[#555B64] text-center">
                        We have received your feedback! Our team will attend to it.
                    </p>
                </div>
            </div>
            <div className={`py-[1.75rem] px-6 rounded-b-2xl 
                w-full bg-white border-t 
                border-t-[#EAECF0] flex gap-[.625rem]`}>
                <button 
                    type="button"
                    onClick={handleClose}
                    className={`mx-auto py-[.875rem] rounded-4xl 
                        w-full max-w-[21.625rem] bg-[#F3F4F6] 
                        font-semibold text-[#006D79]`}>
                    Close
                </button>
            </div>
        </div>
    )
}