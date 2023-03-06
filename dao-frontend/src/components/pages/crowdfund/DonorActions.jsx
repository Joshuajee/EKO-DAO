import { convertToEther, dollarFormat } from "@/libs/utils"
import { memo, useEffect, useContext } from "react"
import { useAccount, useContractRead, useContractWrite } from "wagmi"
import ProjectABI from '@/abi/contracts/CrowdFundProject.sol/Project.json';
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import LoadingButton from "@/components/ui/form/LoadingButton";

const DonorActions = ({status, contract, expired}) => {

    const { address, isConnected } = useAccount()

    const { isAdminLoggedIn } = useContext(AuthContext);

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

    useEffect(() => {
        if (donorWithdraw.isError) 
            return toast.error(donorWithdraw?.error?.reason)
    
        if (adminWithdraw.isError) 
            return toast.error(adminWithdraw?.error?.reason)

    }, [adminWithdraw.isError, adminWithdraw?.error, donorWithdraw.isError, donorWithdraw?.error]);


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

            { (status === 2 && isAdminLoggedIn) &&
                <div className="w-60">
                    <LoadingButton
                        loading={adminWithdraw?.isLoading}
                        onClick={adminWithdraw?.write}>
                        Withdraw your funds
                    </LoadingButton>
                </div>
            }

        </div>
    )
}

export default memo(DonorActions)