import LoadingButton from "@/components/ui/form/LoadingButton";
import { useState, useEffect } from "react"
import { useAccount, useContractWrite } from "wagmi"
import Input from "@/components/ui/form/Input";
import { toast } from "react-toastify";
import ApprovalBtn from "@/components/ui/form/ApprovalBtn";
import Balance from "@/components/ui/form/Balance";
import hackathonABI from "@/abi/contracts/Hackathon.sol/Hackathon.json";
import { convertToEther, convertToWEI } from "@/libs/utils";


const DonationHackForm = ({hackathon, close}) => {

    const { hackathonAddress } = hackathon

    const [amount, setAmount] = useState(null);
    const [amountError, setAmountError] = useState(false);

    const [allowance, setAllowance] = useState(null);
    const [balance, setBalance] = useState(null);

    const { address } = useAccount()

    const donation = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: hackathonAddress,
        abi: hackathonABI,
        functionName: 'fundHackathon',
        args: [convertToWEI(amount)],
    })

    const submit = (e) => {
        e.preventDefault()
        donation?.write()
    }

    useEffect(() => {
        if (donation?.isError) toast.error(donation?.error?.reason)

        if (donation?.isSuccess) {
            toast.success("Donation Successful")
            close()
        }

    }, [donation?.isError, donation?.error, donation?.isSuccess, close]);

    useEffect(() => {
        if (0 >= amount) setAmountError(true)
        else setAmountError(false)
    }, [amount])

    return (
        <div className="text-gray-700 w-full">

            <Balance 
                address={address} contract={hackathonAddress} 
                allowance={allowance} balance={balance}
                setAllowance={setAllowance} setBalance={setBalance} />

            <form onSubmit={submit}>
                
                <label for="input-group-1" className="text-center block mb-2 text-lg font-medium text-gray-900">Your Donation</label>

                <Input 
                    type="number" 
                    label={"Donation Amount (USDC)"} 
                    value={amount} onChange={setAmount} 
                    error={amountError} 
                    helperText={`Amount should be greater than zero`} />

                <LoadingButton disabled={allowance < amount} loading={donation?.isLoading}> Donate </LoadingButton>

            </form>

            <ApprovalBtn address={address} contract={hackathonAddress} amount={amount} allowance={allowance} setAllowance={setAllowance} />

        </div>
    )
}

export default DonationHackForm