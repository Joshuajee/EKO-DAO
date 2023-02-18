import LoadingButton from "@/components/ui/form/LoadingButton";
import { ethers } from "ethers";
import { useState, useEffect } from "react"
import { useAccount, useContractWrite } from "wagmi"
import ProjectABI from '@/abi/contracts/CrowdFundProject.sol/Project.json';
import Input from "@/components/ui/form/Input";
import { toast } from "react-toastify";
import ApprovalBtn from "@/components/ui/form/ApprovalBtn";
import Balance from "@/components/ui/form/Balance";
import { convertToEther } from "@/libs/utils";


const DonationForm = ({project, close}) => {

    const { projectAddress, topic, minimumDonation } = project

    const [amount, setAmount] = useState(null);
    const [amountError, setAmountError] = useState(false);

    const [allowance, setAllowance] = useState(null);
    const [balance, setBalance] = useState(null);

    const { address } = useAccount()

    const donation = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: projectAddress,
        abi: ProjectABI,
        functionName: 'donate',
        args: [address, Number(amount) <= 0 ? 0 : ethers.utils.parseUnits(amount, 'ether')],
    })

    const submit = (e) => {
        e.preventDefault()
        donation?.write()
    }

    useEffect(() => {
        if (donation?.isError) toast.error(donation?.error?.message)

        if (donation?.isSuccess) {
            toast.success("Donation Successful")
            close()
        }

    }, [donation?.isError, donation?.error, donation?.isSuccess, close]);

    useEffect(() => {
        if (convertToEther(minimumDonation) > amount) setAmountError(true)
        else setAmountError(false)
    }, [minimumDonation, amount])

    return (
        <div className="text-gray-700 p-4 md:px-4  w-full">

            <Balance 
                address={address} contract={projectAddress} 
                allowance={allowance} balance={balance}
                setAllowance={setAllowance} setBalance={setBalance} />

            <h2 className="text-black text-base md:text-base font-semibold mb-3">{topic}</h2>

            <form onSubmit={submit}>
                
                <label for="input-group-1" className="text-center block mb-2 text-lg font-medium text-gray-900">Your Donation</label>

                <Input type="number" label={"Donation Amount (USDC)"} value={amount} onChange={setAmount} error={amountError} helperText={"Amount should be greater than zero"} />

                <LoadingButton disabled={allowance < amount} loading={donation?.isLoading}> Donate </LoadingButton>

            </form>

            <ApprovalBtn address={address} contract={projectAddress} amount={amount} allowance={allowance} setAllowance={setAllowance} />

        </div>
    )
}

export default DonationForm