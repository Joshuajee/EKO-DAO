import { useState } from "react"
import ModalWrapper from "@/components/ui/ModalWrapper"
import { links, routes } from "@/libs/routes"
import { useRouter } from "next/router"
import { AiOutlineClockCircle } from "react-icons/ai"
import CohortForm from "./CohortForm"
import CohortStatus from "./CohortStatus"
import { memo } from "react"

const CohortCard = ({cohort, expanded}) => {

    const { name, content, commitment, size, startDate, endDate } = cohort

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
            {/* <h3 className="mb-3 text-sm">COHORT ADDRESS: {cohort.contractAddress}</h3> */}
            <h2 className="text-black text-xl md:text-2xl font-semibold mb-3">{name}</h2>
            <p className="mb-3">{content}
               {` The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`}
            </p>
            
            <div className="flex mb-4">
                <AiOutlineClockCircle size={18} /> <p className="ml-2 text-sm">COHORT ACTIVE</p>
            </div>

            <div className="flex justify-end">
                <CohortStatus expanded={expanded} fee={commitment} students={size} start={startDate} end={endDate} />
            </div>

            <div className="flex justify-between">

                { !expanded ? <button onClick={() => router.push(`${links.cohorts}/${cohort.contractAddress}`)} className="text-gray-600">View Details </button> : <div> </div> }

                { expanded && <button onClick={handleClick} className="bg-blue-600 hover:bg-blue-800 rounded-lg px-8 py-2 text-white"> Enroll </button> }

            </div>

            <ModalWrapper title={"Join Cohort"} open={open} handleClose={handleClose}>
                <CohortForm cohort={cohort} />
            </ModalWrapper>
            
        </div>
    )
}

export default memo(CohortCard)