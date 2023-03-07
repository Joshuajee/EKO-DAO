import { convertToEther, dollarFormat } from "@/libs/utils"
import { memo } from "react"

const ProjectStatus = ({target, current, donorCount, minDonation }) => {

    const currentPercent = current * 100 / target

    return (
        <div className="block py-4 w-full">

            <div className="text-sm flex flex-col">

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