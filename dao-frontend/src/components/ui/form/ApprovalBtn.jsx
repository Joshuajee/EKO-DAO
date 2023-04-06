import { memo, useEffect } from "react"
import { useContractRead, useContractWrite } from "wagmi"
import { ethers } from "ethers";
import LoadingButton from "./LoadingButton"
import USDCABI from '@/abi/contracts/USDC.sol/USDC.json';
import { USDC } from "@/libs/utils";
import { toast } from "react-toastify";

const ApprovalBtn = ({contract, setAllowance, allowance, amount, token, symbol}) => {

    const approval = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: token || USDC,
        abi: USDCABI,
        functionName: 'approve',
        args: [contract, Number(amount) <= 0 ? 0 : ethers.utils.parseUnits(amount, 'ether')],
    })

    useEffect(() => {
        if (approval?.isSuccess) {
            toast.success(approval?.success)
            setAllowance(amount)
        }
    }, [approval?.isSuccess, setAllowance, amount, approval?.success])

    if (Number(amount) == 0 || Number(amount) <= allowance) return

    return (
        <LoadingButton loading={approval?.isLoading} onClick={approval?.write}> Approve Token {amount} { symbol ||  "USDC" }</LoadingButton>
    )
}

export default memo(ApprovalBtn)