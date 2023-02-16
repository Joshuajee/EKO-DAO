import { contractAddress, dollarFormat } from "@/libs/utils";
import { useState } from "react"
import { useContractWrite } from "wagmi"

const CohortForm = ({cohort}) => {

    const { id, topic, fee } = cohort
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

            <div class="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Info</span>
                <div>
                    <span class="font-medium">Info!</span> Your commitment fee will be refunded, if you complete this program.
                </div>
            </div>

            <p className="text-center my-4">Commitment fee {dollarFormat(fee)} USDC</p>

            <div className="flex flex-col justify-between">
                <button className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-white"> Pay Commitment Fee </button>
            </div>
            
        </div>
    )
}

export default CohortForm