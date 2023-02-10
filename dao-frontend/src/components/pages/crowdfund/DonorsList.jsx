import SideTableWrapper from "@/components/ui/SideTableWrapper"
import { getRandomInt } from "@/libs/dummy"
import { useRouter } from "next/router"
import { AiOutlineClockCircle } from "react-icons/ai"
import truncateEthAddress from "truncate-eth-address"


const DonorsList = ({donors}) => {

    return (
        <div className="text-gray-700 bg-white rounded-md p-4 md:px-4 shadow-lg w-full">

            <h2 className="text-black text-xl md:text-2xl font-semibold mb-3">Donors</h2>

            <SideTableWrapper>

                <table class="w-full text-sm text-left text-gray-500">

                    <thead class="text-xs text-gray-900 uppercase">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Currency
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            donors.map((voter, index) => {
                                return (
                                    <tr key={index} className="bg-white">
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {truncateEthAddress(voter.address)}
                                        </td>
                                        <td className={`px-6 py-4`}>
                                            {getRandomInt(1, 100000)}
                                        </td>

                                        <td className={`px-6 py-4 `}>
                                            USDC
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

export default DonorsList