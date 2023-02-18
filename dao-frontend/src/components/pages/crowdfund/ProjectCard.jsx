import { memo, useState } from "react"
import ModalWrapper from "@/components/ui/ModalWrapper"
import { links } from "@/libs/routes"
import { useRouter } from "next/router"
import { AiOutlineClockCircle } from "react-icons/ai"
import DonationForm from "./DonationForm"
import ProjectStatus from "./ProjectStatus"

const ProjectCard = ({project, expanded}) => {

    const [open, setOpen] = useState(false);

    const { 
        projectTopic, description, noOfDonors, fundBalance, 
        minimumDonation, projectAddress, targetFund
    } = project


    const router = useRouter()

    const handleClick = () => {
        setOpen(true)
    } 

    const handleClose = () => {
        setOpen(false)
    } 

    return (
        <div className="text-gray-700 bg-white rounded-md p-4 md:px-4 shadow-lg w-full">
            {/* <h3 className="mb-3 text-sm">POSTED {date} | PROJECT ID </h3> */}
            <h2 className="text-black text-xl md:text-2xl font-semibold mb-3">{projectTopic}</h2>
            <p className="mb-3">{description}</p>
            
            <div className="flex mb-4">
                <AiOutlineClockCircle size={18} /> <p className="ml-2 text-sm">PROJECT ACTIVE</p>
            </div>

            <div className="flex justify-end">
                <ProjectStatus target={targetFund.toString()} current={fundBalance.toString()} donorCount={noOfDonors.toString()} minDonation={minimumDonation.toString()} />
            </div>

            <div className="flex justify-between">

                { !expanded ? <button onClick={() => router.push(`${links.crowdfunding}/${projectAddress}`)} className="text-gray-600">View Details </button> : <div> </div> }

                <button onClick={handleClick} className="bg-green-600 hover:bg-green-700 rounded-lg px-8 py-2 text-white"> Donate </button>

            </div>

            <ModalWrapper open={open} handleClose={handleClose} title="Donation Form">
                <DonationForm project={project} close={handleClose} />
            </ModalWrapper>
            
        </div>
    )
}

export default memo(ProjectCard)