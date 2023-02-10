import { useState } from "react"
import ModalWrapper from "@/components/ui/ModalWrapper"
import { links } from "@/libs/routes"
import { useRouter } from "next/router"
import { AiOutlineClockCircle } from "react-icons/ai"
import DonationForm from "./DonationForm"
import ProjectStatus from "./ProjectStatus"

const ProjectCard = ({project, expanded}) => {

    const [open, setOpen] = useState(false);

    const { id, date, topic, content, target, current, donorCount, minDonation } = project

    const router = useRouter()


    const handleClick = () => {
        setOpen(true)
    } 

    const handleClose = () => {
        setOpen(false)
    } 

    return (
        <div className="text-gray-700 bg-white rounded-md p-4 md:px-4 shadow-lg w-full">
            <h3 className="mb-3 text-sm">POSTED {date} | PROJECT ID {id}</h3>
            <h2 className="text-black text-xl md:text-2xl font-semibold mb-3">{topic}</h2>
            <p className="mb-3">{content}</p>
            
            <div className="flex mb-4">
                <AiOutlineClockCircle size={18} /> <p className="ml-2 text-sm">PROJECT ACTIVE</p>
            </div>

            <div className="flex justify-end">
                <ProjectStatus target={target} current={current} donorCount={donorCount} minDonation={minDonation} />
            </div>

            <div className="flex justify-between">

                { !expanded ? <button onClick={() => router.push(`${links.crowdfunding}/${id}`)} className="text-gray-600">View Details </button> : <div> </div> }

                <button onClick={handleClick} className="bg-green-600 hover:bg-green-700 rounded-lg px-8 py-2 text-white"> Donate </button>

            </div>

            <ModalWrapper open={open} handleClose={handleClose}>
                <DonationForm project={project} />
            </ModalWrapper>
            
        </div>
    )
}

export default ProjectCard