import { useEffect, useState } from "react"
import FeedbackForm from "./feedback-form";
import { RiAddLine, RiSearchLine } from "@remixicon/react";
import useGet from "@/hooks/useGet.hook"
import type { FeedbackValueProp } from "./feedback-card";
import FeedbackCard from "./feedback-card";
import LeftArrow from "./left-arrow";
import RightArrow from "./right-arrow";

 const filterButtons = [
    { text: "All feedback" },
    { text: "Bugs only" },
    { text: "Feature requests" },
]

export default function FeedbackList() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [activeTab, setActiveTab] = useState('All feedback');
    const [formOpen, setFormOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleOpen = () => {
        setFormOpen(true);
        setTimeout(() => setIsVisible(true), 10);
    };

    const { 
        data: feedbackMessages, 
        loading, 
        error, 
        refetch 
    } = useGet<FeedbackValueProp[]>(apiUrl);

    const filteredFeedback = feedbackMessages?.filter(item => {
        if (activeTab === "All feedback") return true;
        if (activeTab === "Bugs only") return item.type === "bug";
        if (activeTab === "Feature requests") return item.type === "feature";
        return false;
    }).filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.message.toLowerCase().includes(searchTerm.toLowerCase())
  );;
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedFeedback = filteredFeedback?.slice(startIndex, endIndex);
    const totalPages = Math.ceil((filteredFeedback?.length || 0) / itemsPerPage);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

 

    return (
        <>
            <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="w-full flex flex-col items-start gap-2 md:flex-row md:items-center">
                        <div className="flex items-center justify-start gap-[.688rem]">
                            {filterButtons.map(({ text }, index) => (
                                <button 
                                    key={index} 
                                    onClick={() => setActiveTab(text)}
                                    className={
                                        `py-[.375rem] px-3 rounded-md text-sm border !cursor-pointer
                                        ${activeTab === text ? 
                                        'text-[#006D79] border-[#9FDCE1] bg-[#EDFFFF]' : 
                                        'border-[#EAECF0] text-black bg-[#F9FAFB]'}`
                                    }
                                >
                                    {text}
                                </button>
                            ))}
                        </div>
                        <div className={`relative w-full max-w-[24.5rem] flex bg-white 
                            pl-4 py-3 pr-4 border border-[#EAECF0] 
                            focus-visible:border-[#98A2B3] 
                            outline-none rounded-xl`
                        }>
                            <span className="flex items-center gap-2 px-3 space-x-3 border-r border-r-gray-200">
                                <RiSearchLine size={20} />
                            </span>
                            <input
                                type="text"
                                placeholder="Search feedback..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="rounded-xl w-full border focus:outline-none border-none pl-4"
                        />
                        </div>
                    </div>
                    <button 
                        onClick={handleOpen}
                        className="bg-[#006D79] px-6 py-[.875rem] flex gap-2 items-center rounded-4xl w-full max-w-[15rem]">
                            <RiAddLine size={24} color="white"/>
                            <span className="text-white font-semibold !cursor-pointer">Submit feedback</span>
                    </button>  
                </div>

                {/* Pagination and list wrapper */}
                <div className="flex flex-col gap-4">
                    <div 
                        key={`${activeTab}-${currentPage}`}
                        className="grid grid-cols-2 md:grid-cols-4 gap-5 jusitify-between animate fade-in"
                    >
                        <>
                            {loading && 
                                <p className="col-span-full text-sm text-gray-500">
                                    Loading feedback messages...
                                </p>
                            }
                            {error && 
                                <p className="col-span-full text-sm text-red-500">
                                    Error. Please reload the page
                                </p>
                            }
                            {!loading && !error && paginatedFeedback?.length === 0 && (
                                <p className="col-span-full text-sm text-gray-400">No feedback found.</p>
                            )}
                            {paginatedFeedback?.map(({ name, email, number, message, type }, index) => (  
                                <div key={index} className="w-full transition-opacity duration-300 ease-in-out hover:opacity-90">
                                    <FeedbackCard
                                        name={name}
                                        email={email}
                                        number={number}
                                        message={message}
                                        type={type}
                                    />
                                </div>                            
                            ))}
                        </>
                    </div>
                    {paginatedFeedback && paginatedFeedback?.length > 0 &&
                        <div className="w-full flex justify-between items-center">
                            <p className="font-medium text-sm flex gap-[.688rem]">
                                Page
                                <span>{currentPage}</span>
                                of
                                <span>{totalPages}</span>
                            </p>
                            <div className="flex gap-2 max-w-fit items-center">
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    className={`py-[.375rem] px-3 border border-[#EAECF0] rounded-full transition ${
                                        currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                                    }`} 
                                    disabled={currentPage === 1}
                                >
                                    <LeftArrow />
                                </button>
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        className={`py-[.375rem] px-3 border border-[#EAECF0] rounded-full transition ${
                                            currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    disabled={currentPage === totalPages}
                                >
                                    <RightArrow />
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>

            {/* Feedback form */}
             {formOpen && 
                <FeedbackForm 
                    refetch={refetch}
                    isVisible={isVisible} 
                    setFormOpen={setFormOpen} 
                    setIsVisible={setIsVisible} 
                />
            }
        </>
    )
}