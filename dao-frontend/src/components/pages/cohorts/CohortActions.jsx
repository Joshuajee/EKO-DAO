import { contractAddress, convertToEther, dollarFormat, EKONFT, EKONFTCERT, USDC } from "@/libs/utils"
import { memo, useState, useEffect, useContext } from "react"
import { useAccount, useContractRead, useContractWrite } from "wagmi"
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import CohortABI from '@/abi/contracts/Cohort.sol/Cohort.json';
import CohortFacetABI from '@/abi/contracts/facets/CohortFacet.sol/CohortFacet.json'
import LoadingButton from "@/components/ui/form/LoadingButton";
import ModalWrapper from "@/components/ui/ModalWrapper";
import Input from "@/components/ui/form/Input";

const CohortActions = ({status, contract, commitment, isStudent}) => {

    const { isAdmin, isAdminLoggedIn } = useContext(AuthContext);

    const [open, setOpen] = useState(false);
    const [id, setId] = useState()

    const [idError, setIdError] = useState(null)

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

        if (refund.isError) 
            return toast.error(refund?.error?.reason)
    
        if (initCohort.isError) 
            return toast.error(initCohort?.error?.reason)

        if (endCohort.isError) 
            return toast.error(endCohort?.error?.reason)

    }, [initCohort.isError, initCohort?.error, endCohort?.isError, endCohort?.error, refund.isError, refund?.error]);


    useEffect(() => {
        if (Number(id) <= 0) setIdError(true)
        else setIdError(false)

    }, [id])

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
                            onClick={initCohort?.write}
                            color="yellow" loading={initCohort?.isLoading}> 
                            Initialize Cohort
                        </LoadingButton>
                    </div>
                </div>
            }

            { (isAdmin && status != 0) &&
                <div className="flex justify-center">
                    <div className="w-60">
                        <LoadingButton
                            onClick={endCohort?.write}
                            color="yellow" loading={endCohort?.isLoading}> 
                            End Cohort
                        </LoadingButton>
                    </div>
                </div>
            }

            <ModalWrapper title={"Claim Commitment"} open={open} handleClose={handleClose}>

                <div className="flex flex-col justify-between">
                    <Input 
                        type="number" label={"Certificated ID"} 
                        value={id} onChange={setId} 
                        error={idError} helperText={`Enter Valid NFT Certificate ID`} />
                    <LoadingButton disabled={idError} loading={refund?.isLoading} onClick={refund?.write}> Claim Commitment Fee </LoadingButton>
                </div>

            </ModalWrapper>

        </div>
    )
}

export default memo(CohortActions)