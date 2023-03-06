import { useEffect, useState } from "react";
import { links } from "@/libs/routes"
import { useRouter } from "next/router"
import { AiOutlineClockCircle } from "react-icons/ai"
import date from 'date-and-time';
import Poll from "./Poll"
import { useAccount, useContractWrite } from "wagmi";
import LoadingButtonSM from "@/components/ui/form/LoadingButtonSM";
import { contractAddress } from "@/libs/utils";
import ProposalFacetABI from '@/abi/contracts/facets/GovernanceFacet.sol/GovernanceFacet.json';
import { toast } from "react-toastify";
import Badge from "@/components/ui/Badge";
import Countdown from "react-countdown";


const ProposalCard = ({proposal, expanded}) => {

    const { id, name, creationTime, state, description, votesFor, votesAgainst, votingDelay, votingPeriod } = proposal

    const [proposalStatus, setProposalStatus] = useState()
    const [deadline, setDeadline] = useState(0)
    const [delay, setDelay] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const yes = Number(votesFor?.toString())
    const no = Number(votesAgainst?.toString())

    const { isConnected } = useAccount()

    const router = useRouter()

    const voteFor = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: contractAddress,
        abi: ProposalFacetABI,
        functionName: 'voteFor',
        args: [Number(id)],
    })

    const voteAgainst = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: contractAddress,
        abi: ProposalFacetABI,
        functionName: 'voteAgainst',
        args: [Number(id)],
    })

    const yesVote = () => {
        if (!isConnected) return toast.error("Please Connect")
        voteFor?.write()
    } 

    const noVote = () => {
        if (!isConnected) return toast.error("Please Connect")
        voteAgainst?.write()
    } 

    useEffect(() => {
        if (voteFor?.isError) toast.error(voteFor?.error?.reason)
        if (voteFor?.isSuccess) toast.success("You have voted for this proposal")
    }, [voteFor?.isError, voteFor?.error, voteFor?.isSuccess]);

    useEffect(() => {
        if (voteAgainst?.isError) toast.error(voteAgainst?.error?.reason)
        if (voteAgainst?.isSuccess) toast.success("You have voted against this proposal")
    }, [voteAgainst?.isError, voteAgainst?.error, voteAgainst?.isSuccess]);

    useEffect(() => {

        switch (state) {
            case 0:
                if (delay > currentTime)
                    setProposalStatus({color: "gray", status: "Not Started", state: 0})
                else 
                    setProposalStatus({color: "blue", status: "Active", state: 1})
                break
            case 1:
                if (deadline < currentTime){
                    if (yes > no) 
                        setProposalStatus({color: "green", status: "Successful", state: 2})
                    else
                        setProposalStatus({color: "red", status: "Failed", state: 3})
                }
                else 
                    setProposalStatus({color: "blue", status: "Active", state: 1})

                break
            case 2:
                setProposalStatus({color: "green", status: "Successful", state: 2})
                break
            case 3:
                setProposalStatus({color: "red", status: "Failed", state: 3})
                break
            default:
                setProposalStatus({color: "red", status: "Failed", state: 3})
        }

    }, [state, deadline, delay, currentTime, yes, no]);

    useEffect(() => {
        setDeadline(Number(votingPeriod.toString()) * 1000)
        setDelay(Number(votingDelay.toString()) * 1000)
    }, [votingPeriod, votingDelay])

    useEffect(() => {
        setCurrentTime(Number(new Date()))
        const interval = setInterval(() => {
            setCurrentTime(Number(new Date()))
        }, 1000)
        return clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col text-gray-700 bg-white rounded-md p-4 md:px-4 shadow-lg w-full">
           
            <h3 className="mb-3 text-sm">POSTED {date.format(new Date(Number(creationTime.toString()) * 1000), 'ddd, MMM DD YYYY')}  | POLL ID {id.toString()}</h3>
            <h2 className="text-black text-xl md:text-2xl font-semibold mb-3">{name}</h2>
            <p className="mb-3">{description}</p>

            <div className="flex justify-between font-medium">
                <Badge color={proposalStatus?.color}> 
                    <AiOutlineClockCircle size={18} /> 
                    <p className="ml-2 text-sm">Proposal {proposalStatus?.status}</p> 
                </Badge>

                <div>

                    {
                        proposalStatus?.state === 0 &&
                            <>
                                Voting starts in:  <Countdown date={Number(delay)} />
                            </>
                    }

                    {
                        proposalStatus?.state === 1 &&
                            <>
                                Voting ends in:  <Countdown date={Number(deadline)} />
                            </> 
                    }

                </div>

            </div>

            <div className="flex justify-end"><Poll yes={yes} no={no} /></div>

            <div className="flex-grow"></div>

            <div className="flex justify-between">

                { !expanded ? <button onClick={() => router.push(`${links.proposals}/${id.toString()}`)} className="text-gray-600">View Details </button> : <div> </div> }

                {   
                    proposalStatus?.state === 1 &&
                        <div>

                            <LoadingButtonSM 
                                loading={voteFor?.isLoading} 
                                onClick={yesVote}
                                className="bg-green-600 hover:bg-green-700 rounded-lg px-8 py-2 text-white mr-2 disabled:bg-gray-400">
                                Yes
                            </LoadingButtonSM>

                            <LoadingButtonSM 
                                loading={voteAgainst?.isLoading}
                                onClick={noVote}
                                className="bg-red-600 hover:bg-red-700 rounded-lg px-8 py-2 text-white disabled:bg-gray-400">
                                No
                            </LoadingButtonSM>
                            
                        </div>
                }
                
            </div>

        </div>
    )
}

export default ProposalCard