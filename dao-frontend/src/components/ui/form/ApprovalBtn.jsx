import { memo, useEffect } from "react"
import { useContractRead, useContractWrite } from "wagmi"
import { ethers } from "ethers";
import LoadingButton from "./LoadingButton"
import USDCABI from '@/abi/contracts/USDC.sol/USDC.json';
import { USDC } from "@/libs/utils";
import { toast } from "react-toastify";

const ApprovalBtn = ({contract, setAllowance, allowance, amount}) => {

    const approval = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: USDC,
        abi: USDCABI,
        functionName: 'approve',
        args: [contract, Number(amount) <= 0 ? 0 : ethers.utils.parseUnits(amount, 'ether')],
    })

    console.log(contract)


    useEffect(() => {
        if (approval?.isSuccess) {
            toast.success(approval?.success)
            setAllowance(amount)
        }
    }, [approval?.isSuccess, setAllowance, amount, approval?.success])

    console.log(approval)

    if (Number(amount) == 0 || Number(amount) <= allowance) return

    return (
        <LoadingButton loading={approval?.isLoading} onClick={approval?.write}> Approve Token {amount} USDC</LoadingButton>
    )
}

export default memo(ApprovalBtn)