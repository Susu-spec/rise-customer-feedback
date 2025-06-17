import avatarGroupLogo from '../assets/avatar-group-logo.png';
import FeedbackList from './components/feedback-list';


export default function Dashboard() {
    return (
        <section className="flex flex-col gap-6 items-center">
            <div className='flex flex-col gap-2 items-center'>
                <h1 className='font-semibold'>Got a complaint or feedback?</h1>
                <p className="flex items-center gap-[.438rem]">
                    <span>
                        <img src={avatarGroupLogo} alt="Avatar group logo" />
                    </span>
                    <span className="text-sm text-[#555B64]">
                        Our support team is ready to listen and resolve.
                    </span>
                </p>
            </div>
            <FeedbackList />
        </section>
    )
}