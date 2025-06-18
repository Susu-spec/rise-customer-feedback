import { RiMailLine } from "@remixicon/react"
import { useEffect, useRef, useState, type FormEvent } from "react";
import ConfirmationOverlay from "./confirmation-overlay";
import { usePost } from "@/hooks/usePost.hook";

type FeedbackFormProp = {
    refetch: () => Promise<void>
    isVisible?: boolean,
    setIsVisible: (visible: boolean) => void,
    setFormOpen: (open: boolean) => void
}

type FeedbackFormData = {
  name: string;
  email: string;
  type: string;
  message: string;
};


export default function FeedbackForm(
    { refetch, isVisible, setIsVisible, setFormOpen }: 
    FeedbackFormProp
) {
    const apiUrl = import.meta.env.VITE_API_URL;

    const formRef = useRef<HTMLFormElement>(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState<FeedbackFormData>({
        name: '',
        email: '',
        type: '',
        message: '',
    });

    const { post, loading, error } = usePost(apiUrl);

    
    const handleInputChange = () => {
        if (formRef.current) {
            setIsFormValid(formRef.current.checkValidity());
        }
    };

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        try {
            await post(formData);
            await refetch();
            setIsSubmitted(true);
        } catch (err) {
            console.error("Submission failed in handleSubmit");
        }
    };

   const handleClose = () => {
        setIsVisible(false);

        setTimeout(() => {
            setIsSubmitted(false);
            setFormOpen(false);

            setFormData({
                name: '',
                email: '',
                type: '',
                message: '',
            });
            formRef.current?.reset();
        }, 300);
    };


    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isVisible]);

    return (
        <div className={`fixed inset-0 z-[100000] w-screen h-screen 
           bg-black/40 backdrop-blur-md
            flex justify-center items-center
            transition-opacity duration-500 ${
            isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
            <div className="relative">
                {isSubmitted ? 
                    <ConfirmationOverlay handleClose={handleClose}/>
                :
                <div className={`w-full  max-w-[40.375rem] 
                    max-h-fit flex flex-col gap-[1.75rem]
                    rounded-2xl bg-[#F9FAFB] relative shadow-lg z-99`}
                    onClick={(e) => e.stopPropagation()}>

                    {/* Title */}
                    <div className={`py-[1.75rem] rounded-t-2xl 
                        px-6 w-full bg-white border-b border-[#EAECF0] 
                        flex flex-col gap-2`}
                    >
                        <p className="text-2xl font-semibold">
                            What would you like to bring to our attention?
                        </p>
                        <p className="text-sm text-[#555B64]">
                            Kindly fill the details below to submit.
                        </p>
                    </div>

                    {/* Form */}
                    <form 
                        id="feedbackForm"
                        ref={formRef}
                        onSubmit={handleSubmit}
                        onChange={handleInputChange}
                        className="w-full text-[#747881] px-6 text-sm font-medium flex flex-col gap-4" 
                    >
                        <input 
                            type="text"
                            placeholder="Full name"
                            name="name"
                            aria-label="Enter full name"
                            required
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            className="rounded-xl py-3 px-4 border border-[#EAECF0] bg-white focus-visible:border-[#98A2B3] outline-none"/>

                        <div className={`relative w-full flex bg-white 
                            pl-4 py-3 pr-4 border border-[#EAECF0] 
                            focus-visible:border-[#98A2B3] 
                            outline-none rounded-xl`
                        }>
                            <span className="flex items-center gap-2 px-3 space-x-3 border-r border-r-gray-200">
                                <RiMailLine size={20} />
                            </span>
                             <input
                                type="text"
                                placeholder="Enter email"
                                name="email"
                                aria-label="Enter email"
                                required
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className="rounded-xl w-full border focus:outline-none border-none pl-4"/>
                        </div>

                        {/* Select */}
                        <select
                            name="type"
                            required
                            aria-label="Enter feedback type"
                            defaultValue=""
                            onChange={(e) =>
                                setFormData({ ...formData, type: e.target.value })
                            }
                            className="rounded-xl py-3 pl-4 pr-10 border border-[#EAECF0] focus-visible:border-[#98A2B3] outline-none bg-white"
                        >
                            <option value="" disabled >Select feedback type</option>
                            <option value="bug">Bug</option>
                            <option value="feature">Feature</option>
                            <option value="other">Other</option>
                        </select>

                        {/* Text area */}
                        <textarea
                            name="message"
                            rows={4}
                            required
                            aria-label="Enter feedback message"
                            placeholder="Enter feedback message..."
                            onChange={(e) =>
                                setFormData({ ...formData, message: e.target.value })
                            }
                            className="rounded-xl py-3 px-4 border border-[#EAECF0] focus-visible:border-[#98A2B3] outline-none bg-white"
                        />
                        {error && <p className="text-sm text-red-500">Error submitting form. Retry.</p>}
                    </form>

                    {/* Buttons */}
                     <div className={`py-[1.75rem] px-6 rounded-b-2xl 
                        w-full bg-white border-t border-t-[#EAECF0] 
                        flex gap-[.625rem]`}>
                        <button 
                            type="button"
                            onClick={handleClose}
                            className="w-full rounded-4xl bg-[#F3F4F6] font-semibold text-[#006D79]">
                            Close
                        </button>
                        <button 
                            form="feedbackForm" 
                            className={`w-full rounded-4xl px-6 py-[.875rem] text-white font-semibold
                                flex gap-2 items-center justify-center
                                ${isFormValid ? 'bg-[#006D79]' : 'bg-[#9FDCE1]'}
                            `}
                            disabled={!isFormValid}
                            >
                                {loading ? 
                                    <>
                                        <span className="loader"></span>
                                        Submitting
                                    </> :
                                    <span>Submit</span>
                                }
                        </button>
                     </div>
                </div>
            } 
            </div>
        </div>
    )
}