import { convertToEther, dollarFormat } from "@/libs/utils"
import { memo, useEffect, useContext } from "react"
import { useAccount, useContractRead, useContractWrite } from "wagmi"
import ProjectABI from '@/abi/contracts/CrowdFundProject.sol/Project.json';
import { Contract } from "ethers";
import LoadingButton from "@/components/ui/form/LoadingButton";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";

const DonorActions = ({status, contract}) => {

    const { address, isConnected } = useAccount()

    const { isAdminLoggedIn } = useContext(AuthContext);

    const { data, isLoading, isSuccess, isError } = useContractRead({
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


    console.log({ data, isLoading, isSuccess, isError })

    
    console.log(isAdminLoggedIn)

    console.log(status)

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
                        { status === 1 &&
                            <button 
                                onClick={donorWithdraw?.write}
                                className="mt-2 md:mt-0 bg-yellow-600 hover:bg-yellow-700 rounded-lg px-8 py-2 text-white"> 
                                Withdraw your funds
                            </button>
                        }

                    </div>)
            }

        { (status === 2 && isAdminLoggedIn) &&
            <div className="flex justify-center">
                <button 
                    onClick={adminWithdraw?.write}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-white"> 
                    Withdraw funds Admin
                </button>
            </div>
        }

        </div>
    )
}

export default memo(DonorActions)