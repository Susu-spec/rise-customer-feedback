import emailIcon from "@/assets/email-icon.svg";
import phoneIcon from "@/assets/phone-icon.svg";
import reportIcon from "@/assets/report-icon.svg";

type FeedbackValueProp = {
    name: string,
    email: string,
    number: string,
    feedbackType: string,
    message: string
}

export default function FeedbackCard({
    name, email, number, feedbackType, message
}: FeedbackValueProp) {
    
    const pair = colors[getRandomInt(0, colors.length - 1)];

    return (
        <div className="rounded-2xl bg-white p-3 flex flex-col items-center justify-center gap-2">
            <div className="w-full flex items-center gap-2">
                <div className={`h-8 w-8 text-center bg-[${pair.background}] text-[${pair.text}]`}>
                    {avatarSplit(name)}
                </div>
                <p className="font-medium text-black">{name}</p>
            </div>
            <div className="flex items-center gap-2">
                <img src={emailIcon} alt="Email logo" />
                <p className="text-[#555B64] text-sm">
                    {email}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <img src={phoneIcon} alt="Phone logo" />
                <p className="text-[#555B64] text-sm">
                    {number}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <img src={reportIcon} alt="Phone logo" />
                <div className="flex flex-col gap-1">
                    <p className="text-black font-medium text-sm">
                        {feedbackType}
                    </p>
                    <p className="text-[#555B64] text-sm">
                        {message}
                    </p>
                </div>  
            </div>
        </div>
    )
}

function avatarSplit(name: string) {
    let letters = [''];
    const words = name.split(' ');
    for (let i = 0; i < words.length; i++) {
        letters[i] = words[i].charAt(0);
    } 
    return letters
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
