import { useState, useEffect } from 'react'
import Input from '@/components/ui/form/Input'
import LoadingButton from '@/components/ui/form/LoadingButton'
import Layout from '@/components/ui/Layout'
import { convertToWEI, dollarFormat, EKOTOKEN, isEthAddress, USDC } from '@/libs/utils'
import { useContractWrite } from 'wagmi'
import TokenABI from "@/abi/contracts/USDC.sol/USDC.json"
import { toast } from 'react-toastify'

export default function Faucet() {

  const [receiver, setReceiver] = useState("");

  const mint = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: USDC,
    abi: TokenABI,
    functionName: 'mint',
    args: [receiver, convertToWEI(1000)],
  })

  const mintEko = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: EKOTOKEN,
    abi: TokenABI,
    functionName: 'mint',
    args: [receiver, convertToWEI(1000)],
  })

  const isDisabled = () => !isEthAddress(receiver)

  useEffect(() => {
    if (mint.isSuccess) {
      toast.success(`You have received ${dollarFormat(1000)} Test USDC`)
      setReceiver("")
    }
    if (mint.isError) toast.error(mint?.error?.reason)

    if (mintEko.isSuccess) {
      toast.success(`You have received ${dollarFormat(1000)} Test EKO`)
      setReceiver("")
    }
    if (mintEko.isError) toast.error(mintEko?.error?.reason)

  }, [mint.isSuccess, mint.isError, mint.error, mintEko.isSuccess, mintEko.isError, mintEko.error]);


  return (
    <Layout>

      <div className='flex justify-center items-center h-[600px] px-4'>

        <div className="text-gray-700 bg-white rounded-md p-4 md:px-4 shadow-lg w-full max-w-md">

          <Input label={"Enter your Address"} value={receiver} placeholder={"Your ethereum wallet address"} onChange={setReceiver} />

          <LoadingButton loading={mint?.isLoading} disabled={isDisabled()}   onClick={mint?.write}>Mint {dollarFormat(1000)} Test USDC</LoadingButton>
            
          <LoadingButton loading={mintEko?.isLoading} disabled={isDisabled()}   onClick={mintEko?.write}>Mint {dollarFormat(1000)} Test EKO</LoadingButton>
            
        </div>

      </div>
      
    </Layout>
  )
}
