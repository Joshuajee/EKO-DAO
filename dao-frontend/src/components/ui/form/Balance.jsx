import { memo, useEffect } from "react"
import { useContractRead, useContractWrite } from "wagmi"
import USDCABI from '@/abi/contracts/USDC.sol/USDC.json';
import { convertToEther, dollarFormat, USDC } from "@/libs/utils";

const Balance = ({contract,  address, setAllowance, setBalance, allowance, balance, token}) => {

    const getAllowance = useContractRead({
        mode: 'recklesslyUnprepared',
        address: token || USDC,
        abi: USDCABI,
        functionName: 'allowance',
        args: [address, contract],
        watch: true,
        enabled: address && true
    })

    const getBalance = useContractRead({
        mode: 'recklesslyUnprepared',
        address:  token || USDC,
        abi: USDCABI,
        functionName: 'balanceOf',
        args: [address],
        watch: true,
        enabled: address && true
    })

    useEffect(() => {
        setBalance(getBalance?.data || 0)
        setAllowance(getAllowance?.data || 0)
    }, [getAllowance?.data, getBalance?.data, setAllowance, setBalance])

    return (
       <div className="font-medium">
        <p>Balance: {dollarFormat(convertToEther(balance))} USDC</p>
        <p>Allowance: {dollarFormat(convertToEther(allowance))} USDC</p>
       </div>
    )
}

export default memo(Balance)