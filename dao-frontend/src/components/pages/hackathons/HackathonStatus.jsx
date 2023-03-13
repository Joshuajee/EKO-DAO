import { memo } from "react"
import date from 'date-and-time';
import { dollarFormat } from "@/libs/utils"


const HackathonStatus = ({hackathon, expanded, prizePool}) => {

    const { startDate, endDate, numOfStudent } = hackathon

    return (
        <div className="block py-4 w-full">

            <div className="text-sm flex flex-col">

                <div className="flex flex-col md:flex-row justify-between font-medium">
                    <p>No of Participant: {numOfStudent.toString()} </p> 
                    <p>Prize Pool: {dollarFormat((prizePool))} USDC</p>
                </div>

                <div className="flex flex-col md:flex-row justify-between font-medium">
                    <p>Start Date: {date.format(new Date(Number(startDate)), 'ddd, MMM DD YYYY')} </p> 
                    <p>End Date: {date.format(new Date(Number(endDate)), 'ddd, MMM DD YYYY')} </p> 
                    {/* <div className="flex font-medium">
                        <p className="mr-2">Time Left: </p> <Countdown date={Number(endDate.toString()) * 1000} />
                    </div> */}
                </div>


            </div>

        </div>
    )
}

export default memo(HackathonStatus)