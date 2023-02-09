import { AiFillInfoCircle } from "react-icons/ai"
import date from 'date-and-time';
import { dollarFormat } from "@/libs/utils"

const CohortStatus = ({fee, students, start,  end}) => {
    return (
        <div className="block py-4 w-full max-w-xs">

            <div className="text-sm flex flex-col items-end">

                <h4 className="text-right text-sm mb-2">Cohort Status</h4>

                <p className="flex font-semibold">
                    Commitment Fee: {dollarFormat(fee)} 
                    <AiFillInfoCircle className="ml-2" /> 
                </p>
                <p className="font-semibold">Students: {students} </p>
                <p className="font-semibold">Start Date: {date.format(new Date(start), 'ddd, MMM DD YYYY')}</p>
                <p className="font-semibold">End Date: {date.format(new Date(end), 'ddd, MMM DD YYYY')}</p>

            </div>
        </div>
    )
}

export default CohortStatus