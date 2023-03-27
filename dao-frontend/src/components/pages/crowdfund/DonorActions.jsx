import { convertToEther, dollarFormat } from "@/libs/utils"
import { memo, useEffect, useState, useContext } from "react"
import { useAccount, useContractRead, useContractWrite } from "wagmi"
import ProjectABI from '@/abi/contracts/CrowdFundProject.sol/Project.json';
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import LoadingButton from "@/components/ui/form/LoadingButton";

const DonorActions = ({status, contract, expired}) => {

    const [loading, setLoading] = useState(false);

    const { address, isConnected } = useAccount()

    const { isAdmin, isAddminLoggedIn } = useContext(AuthContext);

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


    const adminWithdrawaltHttp = async () => {

        setLoading(true)

        try {

            const request = new AuthRequest(`/crowdfundings/withdraw/${contract}`)
            
            await request.post({})

            toast.success("Withdrawal Successful")

        } catch (e) {
            console.error(e)
        }

        setLoading(false)
    }

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

            { (status === 2 && isAdmin) &&
            <div className="flex justify-center">
                <div className="w-60">
                    <LoadingButton
                        loading={isAddminLoggedIn ? loading : adminWithdraw?.isLoading}
                        onClick={isAddminLoggedIn ? adminWithdrawaltHttp : adminWithdraw?.write}>
                        Withdraw your funds
                    </LoadingButton>
                </div>
            </div>
            }

        </div>
    )
}

export default memo(DonorActions)