import { links } from "@/libs/routes"
import { useRouter } from "next/router"
import { AiOutlineClockCircle } from "react-icons/ai"
import Poll from "./Poll"

const ProposalCard = ({proposal, expanded}) => {

    const { id, date, topic, content, yes, no } = proposal

    const router = useRouter()

    return (
        <div className="text-gray-700 bg-white rounded-md p-4 md:px-4 shadow-lg w-full">
            <h3 className="mb-3 text-sm">POSTED {date} | POLL ID {id}</h3>
            <h2 className="text-black text-xl md:text-2xl font-semibold mb-3">{topic}</h2>
            <p className="mb-3">{content}</p>
            
            <div className="flex">
                <AiOutlineClockCircle size={18} /> <p className="ml-2 text-sm">POLL ACTIVE</p>
            </div>

            <div className="flex justify-end"><Poll yes={yes} no={no} /></div>

            <div className="flex justify-between">
                { !expanded ? <button onClick={() => router.push(`${links.proposals}/${id}`)} className="text-gray-600">View Details </button> : <div> </div> }

                <div>
                    <button className="bg-green-600 hover:bg-green-700 rounded-lg px-8 py-2 text-white mr-2"> Yes </button>
                    <button className="bg-red-600 hover:bg-red-700 rounded-lg px-8 py-2 text-white"> No </button>
                </div>
                
            </div>

        </div>
    )
}

export default ProposalCard