import { memo } from "react"
import { useAccount, useContractRead } from "wagmi"

const VoterAction = ({id}) => {

    const { isConnected } = useAccount()

    const { data } = useContractRead({
        address: contract,
        abi: ProjectABI,
        functionName: 'isDonor',
        args: [id],
        enabled: isConnected
    })

    return (
        <div>
            
            { 
                data?.[0] && (
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <p>
                            You donated 
                            <strong> {dollarFormat(convertToEther(data?.[1]?.toString())) } USD </strong> 
                            to this Campaign
                        </p> 

                    </div>)
            }

        </div>
    )
}

export default memo(VoterAction)