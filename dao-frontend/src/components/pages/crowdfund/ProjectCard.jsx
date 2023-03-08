import { memo, useEffect, useState } from "react"
import date from 'date-and-time';
import ModalWrapper from "@/components/ui/ModalWrapper"
import { links } from "@/libs/routes"
import { useRouter } from "next/router"
import { AiOutlineClockCircle } from "react-icons/ai"
import DonationForm from "./DonationForm"
import ProjectStatus from "./ProjectStatus"
import Badge from "@/components/ui/Badge"
import DonorActions from "./DonorActions"
import { useAccount } from "wagmi"
import { toast } from "react-toastify"
import Countdown from "react-countdown"

const ProjectCard = ({project, contract, expanded}) => {

    const [open, setOpen] = useState(false);
    const [projectStatus, setProjectStatus] = useState()
    const [deadline, setDeadline] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const expired = deadline < currentTime

    const { 
        projectTopic, description, noOfDonors, fundBalance, 
        minimumDonation, projectAddress, targetFund, status,
        endDate
    } = project

    const router = useRouter()

    const { isConnected } = useAccount()

    const handleClick = () => {
        if (!isConnected) return toast.error("Please Connect")
        setOpen(true)
    } 

    const handleClose = () => {
        setOpen(false)
    } 

    useEffect(() => {
        switch (status) {
            case 1:
                setProjectStatus({color: "red", status: "Expired"})
                break
            case 2:
                setProjectStatus({color: "green", status: "Successful"})
                break
            case 3:
                setProjectStatus({color: "gray", status: "Executed"})
                break
            default:
                if (deadline < currentTime)
                    setProjectStatus({color: "red", status: "Expired"})
                else 
                    setProjectStatus({color: "blue", status: "Active"})
                break
        }
    }, [status, deadline, currentTime]);

    useEffect(() => {
        setDeadline(Number(endDate.toString()) * 1000)
    }, [endDate])

    useEffect(() => {
        setCurrentTime(Number(new Date()))
        const interval = setInterval(() => {
            setCurrentTime(Number(new Date()))
        }, 1000)
        return clearInterval(interval)
    }, [])


    return (
        <div className="w-full text-gray-700 bg-white rounded-md p-4 md:px-4 shadow-lg">
            {/* <h3 className="mb-3 text-sm">POSTED {date} | PROJECT ID </h3> */}
            <h2 className="text-black text-xl md:text-2xl font-semibold mb-3">{projectTopic}</h2>
            <p className="mb-3">{description}</p>
            
            <Badge color={projectStatus?.color}> 
                <AiOutlineClockCircle size={18} /> 
                <p className="ml-2 text-sm">Project {projectStatus?.status}</p> 
            </Badge>

            <div className="flex flex-col md:flex-row justify-between font-medium"> 

                <div className="text-sm md:text-base flex mt-2 font-medium">
                    <p className="mr-2">End Date: {date.format(new Date(Number(endDate.toString()) * 1000), 'ddd, MMM DD YYYY')} </p> 
                </div>

                <div className="text-sm md:text-base flex mt-2 font-medium">
                    <p className="mr-2">Time Left: </p> <Countdown date={Number(endDate.toString()) * 1000} />
                </div>
            
            </div>

            <div>
                <ProjectStatus target={targetFund.toString()} current={fundBalance.toString()} donorCount={noOfDonors.toString()} minDonation={minimumDonation.toString()} />
            </div>

            <div className="flex justify-between">

                { !expanded ? <button onClick={() => router.push(`${links.crowdfunding}/${projectAddress}`)} className="text-gray-600">View Details </button> : <div> </div> }

                { (status === 1 || !expired) &&  <button onClick={handleClick} className="bg-green-600 hover:bg-green-700 rounded-lg px-8 py-2 text-white"> Donate </button> }

            </div>

            <ModalWrapper open={open} handleClose={handleClose} title="Donation Form">
                <DonationForm project={project} close={handleClose} />
            </ModalWrapper>

            {expanded && <DonorActions expired={expired} status={status} contract={contract} />}
            
        </div>
    )
}

export default memo(ProjectCard)