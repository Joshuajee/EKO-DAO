import Input from "@/components/ui/form/Input"
import { useState, useEffect, useLayoutEffect } from "react"
import wordsCount from 'words-count';
import { contractAddress, convertToWEI, getDate, USDC } from "@/libs/utils"
import { useContractWrite } from "wagmi";
import crowdFundFacetABI from '../../../abi/contracts/facets/CrowdFundFacet.sol/CrowdFundFacet.json';
import { toast } from "react-toastify";
import LoadingButton from "@/components/ui/form/LoadingButton";
import Textarea from "@/components/ui/form/Textarea";
import Select from "@/components/ui/form/Select";
import { durationLists } from "@/libs/constants";

const currentDate = getDate()

const CreateCrowdForm = ({close}) => {

    const [name, setName] = useState("");

    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(durationLists[0]?.value);

    const [target, setTarget] = useState(null);
    const [min, setMin] = useState(null);

    // Errors 
    const [nameError, setNameError] = useState(false);

    const [descriptionError, setDescriptionError] = useState(false);

    const [targetError, setTargetError] = useState(false);
    const [minError, setMinError] = useState(false);

    const create = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: contractAddress,
        abi: crowdFundFacetABI,
        functionName: 'createCampaign',
        args: [name, description, convertToWEI(target), convertToWEI(min), USDC, duration],
    })

    const submit = (e) => {
        e.preventDefault()
        create?.write()
    }

    const isDisabled = () => {
        return nameError || descriptionError || targetError || minError
    }

    // Verify Name
    useEffect(() => {
        if (wordsCount(name) <= 2) setNameError(true)
        else setNameError(false)
    }, [name])

    // Description
    useEffect(() => {
        if (wordsCount(description) <= 10 || wordsCount(description) >= 50 ) setDescriptionError(true)
        else setDescriptionError(false)
    }, [description])

    // Target Funds
    useEffect(() => {
        if (target <= 0) setTargetError(true)
        else setTargetError(false)
    }, [target])

    // Minimum Donation
    useEffect(() => {
        if (min <= 0) setMinError(true)
        else setMinError(false)
    }, [min])


    useEffect(() => {

        if (create.isSuccess) {
            toast.success("Funding Created Successfully")

            setTimeout(() => {
                close()
            }, 600)
        }

        if (create.error) {
            toast.error(create?.error?.reason)
        }

    }, [create.isLoading, create.isSuccess, create.isError, create.error, close])

    return (
        <form className="text-gray-700" onSubmit={submit}>

            <Input value={name} onChange={setName} id="name" label={"Funding Title"} placeholder="e.g Save our Planet" error={nameError} helperText={"Funding Title should have at least 3 words"}  />

            <Textarea value={description} onChange={setDescription} id="description" label={"Funding Description"} placeholder="e.g Contribute and saving the planet in a decentralized manner" error={descriptionError} helperText={"Descripion should contain 10 - 50 words"}></Textarea>

            <div className="grid grid-cols-2 gap-4">

                <Input type="number" label={"Minimum Donation (USDC)"} value={min} onChange={setMin} error={minError} helperText={"Minimum Donation should be greater than zero"}  />

                <Input type="number" label={"Target Donation (USDC)"} value={target} onChange={setTarget} error={targetError} helperText={"Target should be greater than zero"} />

                <Select id={"duration"} label={"Duration"}  lists={durationLists} onChange={setDuration} />

            </div>

            <LoadingButton loading={create?.isLoading} disabled={isDisabled()} > Create Funding</LoadingButton>

        </form>
    )
}

export default CreateCrowdForm