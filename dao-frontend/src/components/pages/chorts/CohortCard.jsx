import { useState } from "react"
import ModalWrapper from "@/components/ui/ModalWrapper"
import { links, routes } from "@/libs/routes"
import { useRouter } from "next/router"
import { AiOutlineClockCircle } from "react-icons/ai"
import CohortForm from "./CohortForm"
import CohortStatus from "./CohortStatus"

const CohortCard = ({cohort, expanded}) => {

    const { id, date, topic, content, fee, students, start, end } = cohort

    const router = useRouter()

    const [open, setOpen] = useState(false)


    const handleClick = () => {
        setOpen(true)
    } 

    const handleClose = () => {
        setOpen(false)
    } 


    return (
        <div className="text-gray-700 bg-white rounded-md p-4 md:px-4 shadow-lg w-full max-h-[500px] overflow-x-hidden overflow-y-auto">
            <h3 className="mb-3 text-sm">POSTED {date} | COHORT ID {id}</h3>
            <h2 className="text-black text-xl md:text-2xl font-semibold mb-3">{topic}</h2>
            <p className="mb-3">{content}</p>
            
            <div className="flex mb-4">
                <AiOutlineClockCircle size={18} /> <p className="ml-2 text-sm">COHORT ACTIVE</p>
            </div>

            <div className="flex justify-end">
                <CohortStatus fee={fee} students={students} start={start} end={end} />
            </div>

            <div className="flex justify-between">

                { !expanded ? <button onClick={() => router.push(`${links.cohorts}/${id}`)} className="text-gray-600">View Details </button> : <div> </div> }

                <button onClick={handleClick} className="bg-blue-600 hover:bg-blue-800 rounded-lg px-8 py-2 text-white"> Join</button>

            </div>

            <ModalWrapper title={"Join Cohort"} open={open} handleClose={handleClose}>
                <CohortForm cohort={cohort} />
            </ModalWrapper>
            
        </div>
    )
}

export default CohortCard