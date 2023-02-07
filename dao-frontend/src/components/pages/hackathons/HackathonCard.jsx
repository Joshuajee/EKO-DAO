import { links, routes } from "@/libs/routes"
import { useRouter } from "next/router"
import { AiOutlineClockCircle } from "react-icons/ai"

const HackathonCard = ({proposal, expanded}) => {

    const { id, date, topic, content } = proposal

    const router = useRouter()

    return (
        <div className="text-gray-700 bg-white rounded-md p-4 md:px-4 shadow-lg w-full">
            <h3 className="mb-3 text-sm">POSTED {date} | PROJECT ID {id}</h3>
            <h2 className="text-black text-xl md:text-2xl font-semibold mb-3">{topic}</h2>
            <p className="mb-3">{content}</p>
            
            <div className="flex mb-4">
                <AiOutlineClockCircle size={18} /> <p className="ml-2 text-sm">PROJECT ACTIVE</p>
            </div>

            <div className="flex justify-between">

                { !expanded ? <button onClick={() => router.push(`${links.hackathons}/${id}`)} className="text-gray-600">View Details </button> : <div> </div> }

                <button className="bg-yellow-600 hover:bg-yellow-700 rounded-lg px-8 py-2 text-white"> Join </button>

            </div>
            
        </div>
    )
}

export default HackathonCard