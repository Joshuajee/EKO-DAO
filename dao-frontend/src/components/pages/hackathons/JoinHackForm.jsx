import ApprovalBtn from "@/components/ui/form/ApprovalBtn";
import Balance from "@/components/ui/form/Balance";
import LoadingButton from "@/components/ui/form/LoadingButton";
import { convertToEther, dollarFormat, EKOTOKEN } from "@/libs/utils";
import { useRouter } from "next/router";
import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import { useAccount, useContractWrite } from "wagmi"
import hackathonABI from "@/abi/contracts/Hackathon.sol/Hackathon.json";

const JoinHackathon = ({hackathon, close}) => {

    const { name, hackathonAddress } = hackathon

    const { address } = useAccount()

    const { topic, commitment } = hackathon
    const [amount, setAmount] = useState(null);

    const [allowance, setAllowance] = useState(null);
    const [balance, setBalance] = useState(null);

    const joinHack = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: hackathonAddress,
        abi: hackathonABI,
        functionName: 'fundHackathon',
        args: [amount],
    })

    useEffect(() => {
        setAmount(Number(convertToEther(commitment)).toString())
    }, [commitment]);

    useEffect(() => {
        if (joinHack?.isError) toast.error(joinHack?.error?.reason)
    }, [joinHack?.isError, joinHack?.error?.reason])

    useEffect(() => {
        if (joinHack?.isSuccess) {
            toast.success("Congrats! you've successfully enrolled")
            close()
        }

    }, [joinHack?.isSuccess, close])

    return (
        <div className="text-gray-700 w-full">

            <Balance 
                address={address} contract={hackathonAddress} 
                allowance={allowance} balance={balance}
                setAllowance={setAllowance} setBalance={setBalance} />

            <h2 className="text-black text-base md:text-base font-semibold mb-3">{topic}</h2>

            <div class="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Info</span>
                <div>
                    <span class="font-medium">Info!</span> Your commitment will be refunded, at the end of this program.
                </div>
            </div>

            <p className="text-center my-4">Commitment commitment {dollarFormat(convertToEther(commitment))} EKO</p>

            <div className="flex flex-col justify-between">
                <LoadingButton disabled={allowance < amount} loading={joinHack?.isLoading} onClick={joinHack?.write}> Pay Commitment Fee </LoadingButton>
            </div>

            <ApprovalBtn token={EKOTOKEN} symbol="EKO" contract={hackathonAddress} amount={amount} allowance={allowance} setAllowance={setAllowance} />
            
        </div>
    )
}

export default JoinHackathon