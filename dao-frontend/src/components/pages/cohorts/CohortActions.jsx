import { contractAddress, convertToEther, dollarFormat, EKONFT, USDC } from "@/libs/utils"
import { memo, useEffect, useContext } from "react"
import { useAccount, useContractRead, useContractWrite } from "wagmi"
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import CohortABI from '@/abi/contracts/Cohort.sol/Cohort.json';
import CohortFacetABI from '@/abi/contracts/facets/CohortFactoryFacet.sol/CohortFactoryFacet.json'

const CohortActions = ({status, contract, expired}) => {

    const { address, isConnected } = useAccount()

    const { isAdminLoggedIn } = useContext(AuthContext);

    const { data } = useContractRead({
        address: contract,
        abi: CohortABI,
        functionName: 'isDonor',
        args: [address],
        enabled: isConnected
    })

    const donorWithdraw = useContractWrite({
        address: contract,
        abi: CohortABI,
        functionName: 'donorWithdraw',
        args: [address],
    })

    const initCohort = useContractWrite({
        address: contractAddress,
        abi: CohortFacetABI,
        functionName: 'initCohort',
        args: [contract, USDC, EKONFT],
    })

    useEffect(() => {
        if (donorWithdraw.isError) 
            return toast.error(donorWithdraw?.error?.reason)
    
        if (initCohort.isError) 
            return toast.error(initCohort?.error?.reason)

    }, [initCohort.isError, initCohort?.error, donorWithdraw.isError, donorWithdraw?.error]);


    return (
        <div className="block py-4 w-full">

            { 
                data?.[0] && (
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <p>
                            You donated 
                            <strong> {dollarFormat(convertToEther(data?.[1]?.toString())) } USD </strong> 
                            to this Campaign
                        </p> 
                        { (status < 1 && expired) &&
                            <button 
                                onClick={donorWithdraw?.write}
                                className="mt-2 md:mt-0 bg-yellow-600 hover:bg-yellow-700 rounded-lg px-8 py-2 text-white"> 
                                Withdraw your funds
                            </button>
                        }

                    </div>)
            }

        { (isAdminLoggedIn) &&
            <div className="flex justify-center">
                <button 
                    onClick={initCohort?.write}
                    className="mt-4 bg-yellow-600 hover:bg-yellow-700 rounded-lg px-8 py-2 text-white"> 
                    Initialize Cohort
                </button>
            </div>
        }

        </div>
    )
}

export default memo(CohortActions)