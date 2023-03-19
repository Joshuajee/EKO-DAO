import date from 'date-and-time';
import { convertToEther, dollarFormat } from "@/libs/utils"
import { memo } from "react";

const CohortStatus = ({fee, students, start,  end, expanded}) => {
    return (
        <div className="block py-4 w-full">

            <div className="text-sm flex flex-col">

                {  expanded &&            
                    <div className="flex flex-col md:flex-row justify-between">

                        <p className="flex font-semibold">
                            Commitment Fee : {dollarFormat(convertToEther(fee))}   
                        </p>

                        <p className="font-semibold">Students: {students} </p>

                    </div>
                }

                <div className="flex flex-col md:flex-row justify-between">

                    <p className="font-semibold">Start Date: {date.format(new Date(Number(start.toString() * 1000)), 'ddd, MMM DD YYYY')}</p>
                    
                    <p className="font-semibold">End Date: {date.format(new Date(Number(end.toString() * 1000)), 'ddd, MMM DD YYYY')}</p>

                </div>

            </div>

        </div>
    )
}

export default memo(CohortStatus)