import SideTableWrapper from "@/components/ui/SideTableWrapper"
import truncateEthAddress from "truncate-eth-address"


const VotersList = ({voters}) => {

    return (
        <div className="text-gray-700 bg-white rounded-md p-4 md:px-4 shadow-lg w-full">

            <h2 className="text-black text-xl md:text-2xl font-semibold mb-3">Voters</h2>

            <SideTableWrapper>

                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Option
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            voters.map((voter, index) => {
                                return (
                                    <tr key={index} className="bg-white dark:bg-gray-800">
                                    
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                           {truncateEthAddress(voter.address)}
                                        </td>
                                        <td className={`px-6 py-4 ${voter.choice.toLowerCase() === "Yes".toLowerCase() ? "text-green-600" : "text-red-600"}`}>
                                            {voter.choice}
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

export default VotersList