import SideTableWrapper from "@/components/ui/SideTableWrapper"
import { getRandomInt } from "@/libs/dummy"
import truncateEthAddress from "truncate-eth-address"


const ParticipantList = ({participant}) => {

    return (
        <div className="text-gray-700 bg-white rounded-md p-4 md:px-4 shadow-lg w-full">

            <h2 className="text-black text-xl md:text-2xl font-semibold mb-3">Participant</h2>

            <SideTableWrapper>

                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Score
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            participant.map((voter, index) => {
                                return (
                                    <tr key={index} className="bg-white dark:bg-gray-800">
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {truncateEthAddress(voter.address)}
                                        </td>
                                        <td className={`px-6 py-4 ${voter.choice.toLowerCase() === "Yes".toLowerCase() ? "text-green-600" : "text-red-600"}`}>
                                            {getRandomInt(1, 1000)}
                                        </td>

                                    </tr>
                                )
                            })
                        }

                    </tbody>
                    
                </table>

            </SideTableWrapper>
        

        </div>
    )
}

export default ParticipantList