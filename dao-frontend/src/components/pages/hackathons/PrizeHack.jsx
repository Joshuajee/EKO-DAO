import { memo } from "react"
import date from 'date-and-time';
import { dollarFormat } from "@/libs/utils"


const PrizeHack = ({hackathon, expanded, prizePool}) => {

    const { 
        startDate, endDate, numOfStudent, 
        winnerPercentage,firstRunnerUpPercentage,
        secondRunnerUpPercentage, winner,firstRunnerUp,
        secondRunnerUp,  
    } = hackathon

    console.log(hackathon)

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


            </div>

        </div>
    )
}

export default memo(PrizeHack)