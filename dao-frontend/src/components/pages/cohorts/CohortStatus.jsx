import { AiFillInfoCircle } from "react-icons/ai"
import date from 'date-and-time';
import { dollarFormat } from "@/libs/utils"

const CohortStatus = ({fee, students, start,  end, expanded}) => {
    return (
        <div className="block py-4 w-full">

            <div className="text-sm flex flex-col">

                <h4 className="text-sm mb-2">Cohort Status</h4>

                {  expanded &&            
                    <div className="flex justify-between">

                        <p className="flex font-semibold">
                            Commitment Fee <AiFillInfoCircle className="ml-1" size={18} /> : {dollarFormat(fee)}   
                        </p>

                        <p className="font-semibold">Students: {students} </p>

                    </div>
                }

                <div className="flex justify-between">

                    <p className="font-semibold">Start Date: {date.format(new Date(Number(start.toString())), 'ddd, MMM DD YYYY')}</p>
                    
                    <p className="font-semibold">End Date: {date.format(new Date(Number(end.toString())), 'ddd, MMM DD YYYY')}</p>

                </div>

            </div>
        </div>
    )
}

export default CohortStatus