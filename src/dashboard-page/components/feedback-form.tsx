import { RiMailLine } from "@remixicon/react"
import { useRef, useState, type FormEvent } from "react";
import ConfirmationOverlay from "./confirmation-overlay";

export type FeedbackFormProp = {
    formOpen?: boolean,
    setFormOpen: (open: boolean) => void
}


export default function FeedbackForm({ formOpen, setFormOpen }: FeedbackFormProp) {
    const formRef = useRef<HTMLFormElement>(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const handleInputChange = () => {
        if (formRef.current) {
            setIsFormValid(formRef.current.checkValidity());
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            console.log("Form is valid and ready to submit");
        }
    }

    const handleClose = () => {
        formRef.current?.reset();
        setFormOpen(false);
        setIsSubmitted(false);
    }

    return (
        <div className={`fixed inset-0 z-[100000] w-screen h-screen 
            bg-[#000000]/30 backdrop-blur-[6px] 
            flex justify-center items-center
            transition-opacity duration-500 ${
            formOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
            <div className="relative">
                {isSubmitted ? 
                    <ConfirmationOverlay setFormOpen={setFormOpen} />
                :
                <div className={`w-full px-6 max-w-[40.375rem] 
                    max-h-[19.5rem] flex flex-col gap-[1.75rem]
                    rounded-2xl bg-[#F9FAFB]`}>
                    {/* Title */}
                    <div className="py-[1.75rem] w-full bg-white border-b border-[#EAECF0] flex gap-2">
                        <p className="text-2xl font-semibold">
                            What would you like to bring to our attention?
                        </p>
                        <p className="text-sm text-[#555B64]">
                            Kindly fill the details below to submit.
                        </p>
                    </div>
                    {/* Form */}
                    <form 
                        ref={formRef}
                        onSubmit={handleSubmit}
                        onChange={handleInputChange}
                        className="w-full text-[#747881] text-sm font-medium" id="feedbackForm">
                        <input 
                            type="text"
                            placeholder="Full name"
                            name="name"
                            aria-label="Enter full name"
                            required
                            className="rounded-xl py-3 px-4 border border-[#EAECF0]"/>

                        <div className="relative w-full flex pl-4 py-3 pr-4 bg-white border-[#EAECF0] rounded-xl">
                            <span className="flex items-center gap-2 px-3 space-x-3 border-r border-r-gray-200">
                                <RiMailLine size={20} />
                            </span>
                             <input
                                type="text"
                                placeholder="Enter email"
                                name="email"
                                aria-label="Enter email"
                                required
                                className="rounded-xl py-3 px-4 border focus:outline-none"/>
                        </div>
                        {/* Select */}
                        <select
                            name="feedbackType"
                            required
                            aria-label="Enter feedback type"
                            className="rounded-xl py-3 px-4 border border-[#EAECF0]"
                        >
                            <option value="" disabled selected>Select feedback type</option>
                            <option value="bug">Bug</option>
                            <option value="feature">Feature</option>
                            <option value="other">Other</option>
                        </select>

                        {/* Text area message */}
                        <textarea
                            name="message"
                            rows={4}
                            required
                            aria-label="Enter feedback message"
                            placeholder="Enter feedback message..."
                            className="rounded-xl py-3 px-4 border border-[#EAECF0]"
                        />
                    </form>

                    {/* Buttons */}
                     <div className="py-[1.75rem] w-full bg-white border-t border-t-[#EAECF0] flex gap-[.625rem]">
                        <button 
                            type="button"
                            onClick={handleClose}
                            className="w-full bg-[#F3F4F6] font-semibold text-[#006D79]">
                            Close
                        </button>
                        <button 
                            form="feedbackForm" 
                            className={`w-full rounded-4xl px-6 py-[.875rem] text-white font-semibold 
                                ${isFormValid ? 'bg-[#006D79]' : 'bg-[#9FDCE1]'}
                            `}
                            disabled={!isFormValid}
                            >
                            Submit
                        </button>
                     </div>
                </div>
                } 
            </div>
        </div>
    )
}