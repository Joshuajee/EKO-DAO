import { memo, useState, useEffect, useContext } from "react"
import { toast } from "react-toastify";
import { dollarFormat, isAddressZero, winnerDetails } from "@/libs/utils"
import ModalWrapper from "@/components/ui/ModalWrapper";
import AwardForm from "./AwardForm";
import LoadingButtonSM from "@/components/ui/form/LoadingButtonSM";
import hackathonABI from "@/abi/contracts/Hackathon.sol/Hackathon.json";
import { useAccount, useContractWrite } from "wagmi";
import { AuthContext } from "@/context/AuthContext";
import LoadingButton from "@/components/ui/form/LoadingButton";


const PrizeHack = ({hackathon, prizePool}) => {

    const { isAdmin } = useContext(AuthContext);
    const { address } = useAccount()
    const [prizeStatus, setPrizeStatus] = useState(null)

    const { 
        winnerPercentage,firstRunnerUpPercentage,
        secondRunnerUpPercentage, winner,firstRunnerUp,
        secondRunnerUp, hackathonAddress, state
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
        address: hackathonAddress,
        abi: hackathonABI,
        functionName: 'endHackathon'
    })

    const prizeWithdrawal = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: hackathonAddress,
        abi: hackathonABI,
        functionName: 'prizeWithdrawal',
        args: [address]
    })

    console.log(prizeStatus)

    console.log(hackathon)

    useEffect(() => {
        if (endHack.isSuccess) {
            toast.success(`Winner Added Successfully`)
  
        }
        if (endHack.isError) toast.error(endHack?.error?.reason)
  
    }, [endHack?.isSuccess, endHack?.isError, endHack?.error]);

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
        <button onClick={handleOpen} className="bg-green-600 hover:bg-green-700 rounded-lg px-8 py-2 text-white">
            Award Prize
        </button>
    )

    const userAction = (
        <div className="w-60">
           { prizeStatus != true &&
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

                { state < 3 && isAdmin ?             
                    endHackathon : prizeStatus ? userAction : adminAction
                }

            </div>

            <ModalWrapper open={open} handleClose={handleClose} title="Award Prize">

                <AwardForm contract={hackathonAddress} close={handleClose} />
               
            </ModalWrapper>

        </div>
    )
}

export default memo(PrizeHack)