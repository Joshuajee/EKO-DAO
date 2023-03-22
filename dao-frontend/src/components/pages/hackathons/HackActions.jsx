import { contractAddress, convertToEther, dollarFormat, EKOTOKEN, USDC } from "@/libs/utils";
import { memo, useEffect, useContext } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import ProjectABI from '@/abi/contracts/CrowdFundProject.sol/Project.json';
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import LoadingButton from "@/components/ui/form/LoadingButton";
import HackathonABI from "@/abi/contracts/Hackathon.sol/Hackathon.json";
import HackathonFacetABI from '@/abi/contracts/facets/HackathonFacet.sol/HackathonFacet.json';

const HackActions = ({id, status, contract, isRigistered}) => {

    const { address } = useAccount()

    const { isAdmin, isAdminLoggedIn } = useContext(AuthContext);

    const endHack = useContractWrite({
        address: contractAddress,
        abi: HackathonFacetABI,
        functionName: 'endHackathon',
        args: [address],
    })

    const initHack = useContractWrite({
        address: contractAddress,
        abi: HackathonFacetABI,
        functionName: 'initializeHackathon',
        args: [id, USDC, EKOTOKEN]
    })
    
    useEffect(() => {
        if (initHack.isError) 
            return toast.error(initHack?.error?.reason)
    
        if (endHack.isError) 
            return toast.error(endHack?.error?.reason)

    }, [endHack.isError, endHack?.error, initHack?.isError, initHack?.error]);

    return (
        <div className="block py-4 w-full">

            { 
                isRigistered && (
                    <div className="font-medium flex flex-col md:flex-row items-center justify-between">
                       
                        <p>
                            You registered for this Hackathon
                        </p> 

                    </div>)
            }

            
            {/* ADMIN */}

            { 
                (isAdmin && status === 0) &&
                    <div className="flex justify-center">
                        <div className="w-60">
                            <LoadingButton
                                onClick={initHack?.write}
                                color="blue" loading={initHack?.isLoading}> 
                                Init Hackathon
                            </LoadingButton>
                        </div>
                    </div>
            }

        </div>
    )
}

export default memo(HackActions)