import { convertToEther, dollarFormat } from "@/libs/utils"
import { memo } from "react"

const ProjectStatus = ({target, current, donorCount, minDonation }) => {

    const currentPercent = current * 100 / target

    return (
        <div className="block py-4 w-full max-w-xs">

            <div className="text-sm flex flex-col items-end">

                <h4 className="text-right text-sm mb-2">Project Status</h4>

                <p className="font-semibold">Funds Raised: {dollarFormat(convertToEther(current))}</p>
                <p className="font-semibold">Target: {dollarFormat(convertToEther(target))}</p>
                <p className="font-semibold">Donors: {donorCount.toString()}</p>
                <p className="font-semibold">Minimum Donation: {dollarFormat(convertToEther(minDonation))}</p>

            </div>

            <progress max={100} value={currentPercent} style={{width: "100%", height: "4px"}} />

        </div>
    )
}

export default memo(ProjectStatus)