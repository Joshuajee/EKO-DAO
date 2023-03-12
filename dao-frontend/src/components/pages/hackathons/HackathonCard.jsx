import { useState, useEffect } from "react"
import LoadingButtonSM from "@/components/ui/form/LoadingButtonSM"
import { links } from "@/libs/routes"
import { useRouter } from "next/router"
import { AiOutlineClockCircle } from "react-icons/ai"
import { useContractWrite } from "wagmi"
import HackActions from "./HackActions"
import HackathonStatus from "./HackathonStatus"
import hackathonABI from "@/abi/contracts/Hackathon.sol/Hackathon.json";
import ModalWrapper from "@/components/ui/ModalWrapper"
import DonationHackForm from "./DonationHackForm"
import Badge from "@/components/ui/Badge"
import JoinHackathon from "./JoinHackForm"

const HackathonCard = ({hackathon, expanded}) => {


    const [hackStatus, setHackStatus] = useState()
    const [openFund, setOpenFund] = useState(false);
    const [openJoin, setOpenJoin] = useState(false);
    const [currentTime, setCurrentTime] = useState(0)

    const { 
        hackathonAddress, name, description, 
        numOfStudent, state, startDate, endDate, 
        funding, minScoreTokenRequired } = hackathon

    const prizePool = Number(funding.toString())

    const router = useRouter()

    const registerHack = useContractWrite({
        address: hackathonAddress,
        abi: hackathonABI,
        functionName: 'register'
    })

    const handleFundClose = () => {
        setOpenFund(false)
    }

    const handleJoinClose = () => {
        setOpenJoin(false)
    }

    useEffect(() => {
        setCurrentTime(Number(new Date()))
        const interval = setInterval(() => {
            setCurrentTime(Number(new Date()))
        }, 1000)
        return clearInterval(interval)
    }, [])

    console.log(hackathon)


    useEffect(() => {
        switch (state) {
            case 1:
                if (startDate < currentTime)
                    setHackStatus({color: "blue", status: "Enrollment is open"})
                if (endDate > currentTime)
                    setHackStatus({color: "green", status: "Hackathon in session"})
                if (endDate < currentTime)
                    setHackStatus({color: "yellow", status: "Hackathon has ended"})
                break
            case 2:
                setHackStatus({color: "green", status: "Successful"})
                break
            case 3:
                setHackStatus({color: "gray", status: "Executed"})
                break
            default:
                setHackStatus({color: "gray", status: "Enrollment not started"})
        }
    }, [state, startDate, endDate, currentTime]);

    return (
        <div className="text-gray-700 bg-white rounded-md p-4 md:px-4 shadow-lg w-full">
            {/* <h3 className="mb-3 text-sm">POSTED {date} | PROJECT ID {id}</h3> */}
            <h2 className="text-black text-xl md:text-2xl font-semibold mb-3">{name}</h2>
            
            <p className="mb-3">{description}</p>
            
            <Badge color={hackStatus?.color}> 
                <AiOutlineClockCircle size={18} /> 
                <p className="ml-2 text-sm">{hackStatus?.status}</p> 
            </Badge>

            <div>
                <HackathonStatus startDate={startDate} endDate={endDate} numOfStudent={numOfStudent} prizePool={prizePool} />
            </div>

            <div className="flex justify-between">

                { !expanded ? <button onClick={() => router.push(`${links.hackathons}/${hackathonAddress}`)} className="text-gray-600">View Details </button> : <div> </div> }

                <div>

                    <button
                        onClick={() => setOpenFund(true)}
                        className="mr-2 bg-green-600 hover:bg-green-700 rounded-lg px-8 py-2 text-white">
                        Donate
                    </button>

                    <button
                        onClick={() => setOpenJoin(true)}
                        className="bg-yellow-600 hover:bg-yellow-700 rounded-lg px-8 py-2 text-white"
                        >
                        Join
                    </button>

                </div>

            </div>

            <HackActions status={state} contract={hackathonAddress}  />

            <ModalWrapper open={openFund} handleClose={handleFundClose} title="Donation Form">
                <DonationHackForm hackathon={hackathon} close={handleFundClose} />
            </ModalWrapper>

            <ModalWrapper open={openJoin} handleClose={handleJoinClose} title="Join Hackathon">
                <JoinHackathon hackathon={hackathon} close={handleJoinClose} commitment={minScoreTokenRequired} />
            </ModalWrapper>
            
        </div>
    )
}

export default HackathonCard