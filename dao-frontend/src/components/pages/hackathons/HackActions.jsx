import { convertToEther, dollarFormat, EKOTOKEN, USDC } from "@/libs/utils";
import { memo, useEffect, useContext } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import ProjectABI from '@/abi/contracts/CrowdFundProject.sol/Project.json';
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import LoadingButton from "@/components/ui/form/LoadingButton";
import hackathonABI from "@/abi/contracts/Hackathon.sol/Hackathon.json";

const HackActions = ({status, contract, expired}) => {

    const { address, isConnected } = useAccount()

    const { isAdmin, isAdminLoggedIn } = useContext(AuthContext);

    const { data } = useContractRead({
        address: contract,
        abi: ProjectABI,
        functionName: 'isDonor',
        args: [address],
        enabled: isConnected
    })

    const donorWithdraw = useContractWrite({
        address: contract,
        abi: ProjectABI,
        functionName: 'donorWithdraw',
        args: [address],
    })

    const adminWithdraw = useContractWrite({
        address: contract,
        abi: ProjectABI,
        functionName: 'adminWithdraw',
        args: [address],
    })

    const initHack = useContractWrite({
        address: contract,
        abi: hackathonABI,
        functionName: 'initializeHackathon',
        args: [USDC, EKOTOKEN]
    })
    
    useEffect(() => {
        if (initHack.isError) 
            return toast.error(initHack?.error?.reason)
    
        if (adminWithdraw.isError) 
            return toast.error(adminWithdraw?.error?.reason)

    }, [adminWithdraw.isError, adminWithdraw?.error, initHack?.isError, initHack?.error]);

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

                        { 
                            (status < 1 && expired) &&
                                <div className="w-60">
                                    <LoadingButton
                                        loading={donorWithdraw?.isLoading}
                                        onClick={donorWithdraw?.write}
                                        color={"green"}>
                                        Withdraw your funds
                                    </LoadingButton>
                                </div>
                        }

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

            {/* { 
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
            } */}

        </div>
    )
}

export default memo(HackActions)