import { contractAddress, EKOTOKEN, USDC } from "@/libs/utils";
import { memo, useEffect, useContext, useState } from "react";
import { useAccount, useContractWrite } from "wagmi";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import LoadingButton from "@/components/ui/form/LoadingButton";
import HackathonFacetABI from '@/abi/contracts/facets/HackathonFacet.sol/HackathonFacet.json';
import AuthRequest from "@/libs/requests";

const HackActions = ({id, status, contract, isRigistered}) => {

    const [initLoading, setInitLoading] = useState(false);

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

    const initHackHttp = async () => {

        setInitLoading(true)

        try {

            const request = new AuthRequest(`/hackathons/init/${id}`)
            
            const response = await request.post({
                stableCoin: USDC,
                scoreToken: EKOTOKEN
            })

            toast.success("Hackathon Initialize Successfully")
  
            console.log(response)

        } catch (e) {
            console.error(e)
        }

        setInitLoading(false)
    }
    
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
                                onClick={isAdminLoggedIn ? initHackHttp : initHack?.write}
                                color="blue" loading={isAdminLoggedIn ? initLoading : initHack?.isLoading}> 
                                Init Hackathon
                            </LoadingButton>
                        </div>
                    </div>
            }

        </div>
    )
}

export default memo(HackActions)