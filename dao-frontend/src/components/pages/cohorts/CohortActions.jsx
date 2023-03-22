import { contractAddress, convertToEther, EKONFTCERT, USDC } from "@/libs/utils"
import { memo, useState, useEffect, useContext } from "react"
import { useAccount, useContractRead, useContractWrite } from "wagmi"
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import CohortABI from '@/abi/contracts/Cohort.sol/Cohort.json';
import CohortFacetABI from '@/abi/contracts/facets/CohortFacet.sol/CohortFacet.json'
import LoadingButton from "@/components/ui/form/LoadingButton";
import ModalWrapper from "@/components/ui/ModalWrapper";
import Input from "@/components/ui/form/Input";
import Balance from "@/components/ui/form/Balance";
import ApprovalBtn from "@/components/ui/form/ApprovalBtn";
import AuthRequest from "@/libs/requests";


const CohortActions = ({status, contract, commitment, isStudent}) => {

    const { address } = useAccount()

    const { isAdmin, isAdminLoggedIn } = useContext(AuthContext);

    const [initLoading, setInitLoading] = useState(false)

    const [open, setOpen] = useState(false);
    const [id, setId] = useState()

    const [amount, setAmount] = useState(0);
    const [allowance, setAllowance] = useState(null);
    const [balance, setBalance] = useState(null);

    const [idError, setIdError] = useState(null)

    const { data } = useContractRead({
        address: contract,
        abi: CohortABI,
        functionName: 'ekoStableAddress',
        enabled: isStudent
    })

    const getBalance = useContractRead({
        address: contract,
        abi: CohortABI,
        functionName: 'ekoStableAddress',
        enabled: isStudent
    })

    const refund = useContractWrite({
        address: contract,
        abi: CohortABI,
        functionName: 'refund',
        args: [commitment, id],
    })

    const endCohort = useContractWrite({
        address: contract,
        abi: CohortABI,
        functionName: 'updateStatus',
        args: [3],
    })

    const initCohort = useContractWrite({
        address: contractAddress,
        abi: CohortFacetABI,
        functionName: 'initCohort',
        args: [contract, USDC, EKONFTCERT],
    })

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {

        if (refund.isSuccess) {
            setOpen(false)
            return toast.success("Refund is successful")
        }

        if (initCohort.isSuccess) 
            return toast.success("Initailize successfully")

        if (endCohort.isSuccess) 
            return toast.success("Cohort has ended")

        if (refund.isError) 
            return toast.error(refund?.error?.reason)
    
        if (initCohort.isError) 
            return toast.error(initCohort?.error?.reason)

        if (endCohort.isError) 
            return toast.error(endCohort?.error?.reason)

    },  [
            initCohort.isSuccess, endCohort?.isSuccess, refund.isSuccess,
            initCohort.isError, initCohort?.error, endCohort?.isError, 
            endCohort?.error, refund.isError, refund?.error
    ]);

    useEffect(() => {
        if (Number(id) <= 0) setIdError(true)
        else setIdError(false)

        setAmount(balance?.toString() || 0)
    }, [id, balance])


    const initCohortHttp = async () => {


        setInitLoading(true)

        try {

            const request = new AuthRequest(`/cohorts/init/${contract}`)
            
            const response = await request.post({
                stableCoin: USDC,
                ekoNft: EKONFTCERT
            })

            toast.success("Cohort Created Successfully")
  
            console.log(response)

        } catch (e) {
            console.error(e)
        }

        setInitLoading(false)
    }


    return (
        <div className="block py-4 w-full">

            { 
                isStudent && (
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <p>You enrolled for this programme</p> 
                        { (status > 0) &&
                            <button 
                                onClick={() => setOpen(true)}
                                className="mt-2 md:mt-0 bg-green-600 hover:bg-green-700 rounded-lg px-8 py-2 text-white"> 
                                Get Refund
                            </button>
                        }

                    </div>)
            }

            { (isAdmin && status === 0) &&
                <div className="flex justify-center">
                    <div className="w-60">
                        <LoadingButton
                            onClick={isAdminLoggedIn ?  initCohortHttp : initCohort?.write}
                            color="yellow" loading={isAdminLoggedIn ? initLoading : initCohort?.isLoading}> 
                            Initialize Cohort
                        </LoadingButton>
                    </div>
                </div>
            }

            {/* { (isAdmin && status != 0) &&
                <div className="flex justify-center">
                    <div className="w-60">
                        <LoadingButton
                            onClick={endCohort?.write}
                            color="yellow" loading={endCohort?.isLoading}> 
                            End Cohort
                        </LoadingButton>
                    </div>
                </div>
            } */}

            <ModalWrapper title={"Claim Commitment"} open={open} handleClose={handleClose}>

                <Balance 
                    address={address} contract={contract} token={data}
                    allowance={allowance} balance={balance} symbol="EKO-USDC"
                    setAllowance={setAllowance} setBalance={setBalance} />

                <div className="flex flex-col justify-between">

                    <Input 
                        type="number" label={"Certificated ID"} 
                        value={id} onChange={setId} placeholder="Enter Valid NFT Certificate ID"
                        error={idError} helperText={`Enter Valid NFT Certificate ID`} />
                    
                    <LoadingButton disabled={idError} loading={refund?.isLoading} onClick={refund?.write}> Claim Commitment Fee </LoadingButton>
                
                    <ApprovalBtn
                        disabled={amount < allowance || idError} 
                        contract={contract} amount={convertToEther(amount)} 
                        token={data} allowance={allowance} 
                        setAllowance={setAllowance} symbol="EKO-USDC"/>

                </div>

            </ModalWrapper>

        </div>
    )
}

export default memo(CohortActions)