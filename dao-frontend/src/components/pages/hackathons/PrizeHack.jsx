import { memo, useState, useEffect } from "react"
import { toast } from "react-toastify";
import { dollarFormat } from "@/libs/utils"
import ModalWrapper from "@/components/ui/ModalWrapper";
import AwardForm from "./AwardForm";
import LoadingButtonSM from "@/components/ui/form/LoadingButtonSM";
import hackathonABI from "@/abi/contracts/Hackathon.sol/Hackathon.json";
import { useContractWrite } from "wagmi";


const PrizeHack = ({hackathon, expanded, prizePool}) => {

    const { 
        startDate, endDate, numOfStudent, 
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

    useEffect(() => {
        if (endHack.isSuccess) {
            toast.success(`Winner Added Successfully`)
  
        }
        if (endHack.isError) toast.error(endHack?.error?.reason)
  
    }, [endHack?.isSuccess, endHack?.isError, endHack?.error]);

    return (
        <div className="block py-4 w-full">

            <h3 className="font-semibold text-2xl text-center">Prize Pool</h3>

            <div className="text-sm flex flex-col items-center">


                <div className="my-2 flex flex-col md:flex-row justify-between font-medium">
                    <p>Winner Prize: {dollarFormat(prizePool * Number(winnerPercentage.toString()))} USDC </p> 
                </div>

                <div className="my-2 flex flex-col md:flex-row justify-between font-medium">
                    <p>First Runner Up Prize: {dollarFormat(prizePool * Number(firstRunnerUpPercentage.toString()))} USDC </p> 
                </div>

                <div className="my-2 mb-8 flex flex-col md:flex-row justify-between font-medium">
                    <p>Second Runner Up: {dollarFormat(prizePool * Number(secondRunnerUpPercentage.toString()))} USDC </p> 
                </div>

                { state < 3 ?             
                    <div>
                        <LoadingButtonSM
                            loading={endHack.isLoading}
                            onClick={endHack?.write}>
                            End Game
                        </LoadingButtonSM>
                    </div>
                        :
                    <button onClick={handleOpen} className="bg-green-600 hover:bg-green-700 rounded-lg px-8 py-2 text-white">
                        Award Prize
                    </button>
                }

            </div>

            <ModalWrapper open={open} handleClose={handleClose} title="Award Prize">

                <AwardForm contract={hackathonAddress} />
               
            </ModalWrapper>

        </div>
    )
}

export default memo(PrizeHack)