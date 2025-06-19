import emailIcon from "@/assets/email-icon.svg";
import reportIcon from "@/assets/phone-icon.svg";
import phoneIcon from "@/assets/report-icon.svg";

export type FeedbackValueProp = {
    name: string,
    email: string,
    number: string,
    type: "bug" | "feature" | "other",
    message: string
}

export default function FeedbackCard({
    name, email, number, type, message
}: FeedbackValueProp) {
    
    const pair = colors[getRandomInt(0, colors.length - 1)];

    return (
        <div className={`
            w-full rounded-2xl bg-white border 
            border-[#EAECF0] p-3 flex flex-col 
            items-center justify-center gap-2`}>
            <div className="w-full flex items-center gap-2">
                <div 
                    className={`
                        h-8 w-8 text-center rounded-[50%] 
                        font-medium flex items-center justify-center`}
                        style={{
                        backgroundColor: pair.background,
                        color: pair.text,
                    }}
                >
                    {avatarInitials(name)}
                </div>
                <p className="font-medium text-black text-sm md:text-base truncate max-w-[20rem] capitalize">
                    {name}
                </p>
            </div>
            <div className="w-full flex items-center gap-2">
                <img src={emailIcon} alt="Email logo" />
                <p className="text-[#555B64] text-xs md:text-sm truncate max-w-[20rem]">
                    {email}
                </p>
            </div>
            {number && 
                <div className="w-full flex items-center gap-2">
                    <img src={phoneIcon} alt="Phone logo" />
                    <p className="text-[#555B64] text-xs md:text-sm">
                        {number}
                    </p>
                </div>
            }
            <div className="w-full flex items-center gap-2">
                <img src={reportIcon} alt="Report logo" />
                <div className="flex flex-col gap-1">
                    <p className="text-black font-medium text-xs md:text-sm">
                        {type}
                    </p>
                    <p className="text-[#555B64] text-xs md:text-sm">
                        {message}
                    </p>
                </div>  
            </div>
        </div>
    )
}

function avatarInitials(name: string): string {
    const words = name.trim().split(/\s+/);
    const validWords = words.filter(word => /^[A-Za-z]/.test(word));
    
    if (validWords.length === 0) return '';
    if (validWords.length === 1) return validWords[0].charAt(0).toUpperCase();
    
    const first = validWords[0].charAt(0).toUpperCase();
    const last = validWords[validWords.length - 1].charAt(0).toUpperCase();
    
    return first + last;
}


const colors = [
    { background: '#F5F1FE', text: '#A479FF'},
    { background: '#F6E4F0', text: '#B80074'},
    { background: '#FFFAEB', text: '#DC6803'},
    { background: '#FEF2F2', text: '#F97066'},
    { background: '#ECFDF3', text: '#039855'},
]

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
