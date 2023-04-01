import { memo } from "react"
import date from 'date-and-time';
import Countdown from "react-countdown";
import { convertToEther, dollarFormat } from "@/libs/utils"


const ProjectStatus = ({target, current, donorCount, minDonation, endDate }) => {

    return (
        <div className="block py-4 w-full">

            <div className="text-sm flex flex-col">

                <div className="flex justify-between font-medium">
                    <p>End Date: {date.format(new Date(Number(endDate) * 1000), 'ddd, MMM DD YYYY')} </p> 
                    <div className="flex font-medium">
                        <p className="mr-2">Time Left: </p> <Countdown date={Number(endDate.toString()) * 1000} />
                    </div>
                </div>

                <div className="flex justify-between font-medium">
                    <p>No of Donors: {donorCount.toString()}</p>
                    <p>Min Donation: {dollarFormat(convertToEther(minDonation))}</p>
                </div>

                <div className="flex justify-between font-medium">
                    <p>Funds Raised: {dollarFormat(convertToEther(current))}</p>
                    <p>Target: {dollarFormat(convertToEther(target))}</p>
                </div>

            </div>

            {/* <progress max={100} value={currentPercent} style={{width: "100%", height: "4px"}} /> */}

        </div>
    )
}

export default memo(ProjectStatus)