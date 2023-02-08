import { getRandomInt } from "@/libs/dummy"
import { useRouter } from "next/router"
import { AiOutlineClockCircle } from "react-icons/ai"
import truncateEthAddress from "truncate-eth-address"


const StudentList = ({students}) => {

    return (
        <div className="text-gray-700 bg-white rounded-md p-4 md:px-4 shadow-lg w-full">

            <h2 className="text-black text-xl md:text-2xl font-semibold mb-3">Students</h2>

            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Address
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Score Tokens
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {
                        students.map((voter, index) => {
                            return (
                                <tr key={index} className="bg-white dark:bg-gray-800">
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {truncateEthAddress(voter.address)}
                                    </td>
                                    <td className={`px-6 py-4`}>
                                        {getRandomInt(1, 100)}
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
       

        </div>
    )
}

export default StudentList