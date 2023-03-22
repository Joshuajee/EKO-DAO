import { memo, useState, useEffect, useContext } from "react"
import { toast } from "react-toastify";
import { contractAddress, dollarFormat, isAddressZero, winnerDetails } from "@/libs/utils"
import ModalWrapper from "@/components/ui/ModalWrapper";
import AwardForm from "./AwardForm";
import LoadingButtonSM from "@/components/ui/form/LoadingButtonSM";
import hackathonABI from "@/abi/contracts/Hackathon.sol/Hackathon.json";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { AuthContext } from "@/context/AuthContext";
import LoadingButton from "@/components/ui/form/LoadingButton";
import HackathonABI from '@/abi/contracts/Hackathon.sol/Hackathon.json';
import HackathonFacetABI from '@/abi/contracts/facets/HackathonFacet.sol/HackathonFacet.json';

const PrizeHack = ({hackathon, prizePool}) => {

    const { isAdmin } = useContext(AuthContext);
    const { address } = useAccount()
    const [prizeStatus, setPrizeStatus] = useState(null)
    const [showPrize, setShowPrize] = useState(null)

    const { 
        winnerPercentage,firstRunnerUpPercentage,
        secondRunnerUpPercentage, winner,firstRunnerUp,
        secondRunnerUp, hackathonAddress, state, id
    } = hackathon

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const endHack = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: contractAddress,
        abi: HackathonFacetABI,
        functionName: 'endHackathon',
        args: [id]
    })

    const prizeWithdrawal = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: hackathonAddress,
        abi: HackathonABI,
        functionName: 'prizeWithdrawal',
        args: [address]
    })

    const hackStatus = useContractRead({
        address: hackathonAddress,
        abi: HackathonABI,
        functionName: 'getHackathonStatus',
    })

    useEffect(() => {
        if (endHack.isSuccess) {
            toast.success(`Winner Added Successfully`)
        }
        if (endHack.isError) toast.error(endHack?.error?.reason)
  
    }, [endHack?.isSuccess, endHack?.isError, endHack?.error, hackStatus?.data]);

    useEffect(() => {

        const status = hackStatus?.data
        
        switch(prizeStatus?.status) {
            case 0:
                if(!status[0]) setShowPrize(true)
                else setPrizeStatus(false)
                break
            case 1:
                if(!status[1]) setShowPrize(true)
                else setPrizeStatus(false)
                break
            case 2:
                if(!status[2]) setShowPrize(true)
                else setPrizeStatus(false)
                break
            default:
                setPrizeStatus(false)

        }
  
    }, [prizeStatus?.status, hackStatus?.data]);

    useEffect(() => {
        if (prizeWithdrawal.isSuccess) {
            toast.success(`Withdrawal Successful`)
  
        }
        if (prizeWithdrawal.isError) toast.error(prizeWithdrawal?.error?.reason)
  
    }, [prizeWithdrawal?.isSuccess, prizeWithdrawal?.isError, prizeWithdrawal?.error]);

    useEffect(() => {
        const details = winnerDetails(hackathon, address, prizePool)
        setPrizeStatus(details)
    }, [hackathon, address, prizePool])


    const endHackathon = (
        <div>
            <LoadingButtonSM
                loading={endHack.isLoading}
                onClick={endHack?.write}>
                End Game
            </LoadingButtonSM>
        </div>
    )

    const adminAction = (
        isAdmin &&  
            <button onClick={handleOpen} className="bg-green-600 hover:bg-green-700 rounded-lg px-8 py-2 text-white">
                Award Prize
            </button>
    )

    const userAction = (
        <div className="w-60">
           { showPrize &&
                <LoadingButton loading={prizeWithdrawal.isLoading} onClick={prizeWithdrawal?.write} color="green" >
                    Withdraw Prize {dollarFormat(prizeStatus?.prize)} USDC
                </LoadingButton>
            }
        </div>
    )

    return (
        <div className="block py-4 w-full">

            <h3 className="font-semibold text-2xl text-center">Prize Pool</h3>

            <div className="text-sm flex flex-col items-center">


                <div className="my-2 flex flex-col items-center font-medium">
                    <p>Winner Prize: {dollarFormat(prizePool * Number(winnerPercentage.toString()) / 100)} USDC </p> 
                    { !isAddressZero(winner) && <p className="text-sm mt-2">{winner}</p> }
                </div>

                <div className="my-2 flex flex-col items-center font-medium">
                    <p>First Runner Up Prize: {dollarFormat(prizePool * Number(firstRunnerUpPercentage.toString()) / 100)} USDC </p> 
                    { !isAddressZero(firstRunnerUp) && <p className="text-sm mt-2">{firstRunnerUp}</p> }
                </div>

                <div className="my-2 mb-8 flex flex-col items-center font-medium">
                    <p>Second Runner Up: {dollarFormat(prizePool * Number(secondRunnerUpPercentage.toString()) / 100)} USDC </p> 
                    { !isAddressZero(secondRunnerUp) && <p className="text-sm mt-2">{secondRunnerUp}</p> }
                </div>

                { (state < 3 && isAdmin) ?             
                    endHackathon : prizeStatus ? userAction : adminAction
                }

            </div>

            <ModalWrapper open={open} handleClose={handleClose} title="Award Prize">
                <AwardForm contract={hackathonAddress} close={handleClose} id={id} />
            </ModalWrapper>

        </div>
    )
}

export default memo(PrizeHack)