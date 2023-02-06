import { AiOutlineClockCircle } from "react-icons/ai"
import { FaClock } from "react-icons/fa"
import { MdLockClock } from "react-icons/md"
import Poll from "./Poll"

const ProposalCard = ({proposal}) => {

    const { id, date, topic, content } = proposal

    return (
        <div className="text-gray-700 bg-white rounded-md p-4 md:px-4 shadow-lg w-full">
            <h3 className="mb-3 text-sm">POSTED {date} | POLL ID {id}</h3>
            <h2 className="text-black text-xl md:text-2xl font-semibold mb-3">{topic}</h2>
            <p className="mb-3">{content}</p>
            
            <div className="flex">
                <AiOutlineClockCircle size={18} /> <p className="ml-2 text-sm">POLL ACTIVE</p>
            </div>

            <div className="flex justify-end"><Poll /></div>

            <button className="text-gray-600">View Details </button>

        </div>
    )
}

export default ProposalCard