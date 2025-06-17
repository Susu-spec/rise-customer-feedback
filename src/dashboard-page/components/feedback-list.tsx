import { useState } from "react"
import FeedbackForm from "./feedback-form";
import { RiAddLine } from "@remixicon/react";

 const filterButtons = [
    { text: "All feedback" },
    { text: "Bugs only" },
    { text: "Feature requests" },
]

export default function FeedbackList() {
    const [activeTab, setActiveTab] = useState('All feedback');
    const [formOpen, setFormOpen] = useState(false);

    // Clicking on button filters the list of items
    return (
        <>
            <div className="w-full flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        {filterButtons.map(({ text }, index) => (
                            <button 
                                key={index} 
                                onClick={() => setActiveTab(text)}
                                className={
                                    `py-[.375rem] px-6 rounded-md text-sm 
                                    ${activeTab === text ? 
                                    'text-[#006D79] border-[#9FDCE1] bg-[#EDFFFF]' : 
                                    'border-[#EAECF0] text-black bg-[#F9FAFB]'}`
                                }
                            >
                                {text}
                            </button>
                        ))}
                    </div>
                    <button 
                        onClick={() => setFormOpen(true)}
                        className="bg-[#006D79] px-6 py-[.875rem] flex gap-2 items-center rounded-4xl">
                            <RiAddLine size={24} color="white"/>
                            <span className="text-white">Submit feedback</span>
                    </button>  
                </div>
                {/* Grid in four columns of cards */}
                {/* Pagination to switch between pages based on number of cards(messages) */}
            </div>
             {formOpen && <FeedbackForm setFormOpen={setFormOpen} />}
        </>
    )
}