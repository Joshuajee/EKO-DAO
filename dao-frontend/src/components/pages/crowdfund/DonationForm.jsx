import { contractAddress } from "@/libs/utils";
import { useState } from "react"
import { useContractWrite } from "wagmi"

const DonationForm = ({project}) => {

    const { id, topic, minDonation } = project
    const [amount, setAmount] = useState("");

    // const donation = useContractWrite({
    //     mode: 'recklesslyUnprepared',
    //     address: contractAddress,
    //     abi: NFTMarketplaceABI,
    //     functionName: 'listItem',
    //     args: [contract.address, tokenId, Number(price) <= 0 ? 0 : ethers.utils.parseUnits(price, 'ether')],
    // })

    const handleChange = (e) => {
        setAmount(e.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

    }

    return (
        <div className="text-gray-700 p-4 md:px-4  w-full">

            <h2 className="text-black text-base md:text-base font-semibold mb-3">{topic}</h2>

            <form onSubmit={submit}>
                <label for="input-group-1" className="text-center block mb-2 text-lg font-medium text-gray-900">Your Donation</label>
                <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        USDC
                    </div>
                    <input type="text" id="input-group-1"  
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-16 p-2.5 " 
                        placeholder="eg 10" onChange={handleChange} />
                </div>

                <div className="flex flex-col justify-between">
                    <button className="bg-green-600 hover:bg-green-700 rounded-lg px-8 py-2 text-white"> Donate </button>
                </div>

            </form>
            
        </div>
    )
}

export default DonationForm