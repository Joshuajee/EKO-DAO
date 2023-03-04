import Input from "@/components/ui/form/Input"
import { useState, useEffect } from "react"
import wordsCount from 'words-count';
import { contractAddress } from "@/libs/utils"
import { useContractWrite } from "wagmi";
import ProposalFacetABI from '@/abi/contracts/facets/GovernanceFacet.sol/GovernanceFacet.json';
import { toast } from "react-toastify";
import LoadingButton from "@/components/ui/form/LoadingButton";
import Textarea from "@/components/ui/form/Textarea";
import Select from "@/components/ui/form/Select";
import { delays, durationLists } from "@/libs/constants";

const CreateProposalForm = ({close}) => {

    const [name, setName] = useState("");

    const [description, setDescription] = useState("");
    const [delay, setDelay] = useState(delays[0]?.value);
    const [duration, setDuration] = useState(durationLists[0]?.value);

    // Errors 
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const create = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: contractAddress,
        abi: ProposalFacetABI,
        functionName: 'newProposal',
        args: [name, description, delay, duration],
    })

    const submit = (e) => {
        e.preventDefault()
        create?.write()
    }

    const isDisabled = () => {
        return nameError || descriptionError 
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


    useEffect(() => {

        if (create.isSuccess) {
            toast.success("Proposal Created Successfully")
            close()
        }

        if (create.isError) {
            toast.error(create?.error?.reason)
        }

    }, [create.isLoading, create.isSuccess, create.isError, create.error, close])

    return (
        <form className="text-gray-700" onSubmit={submit}>

            <Input value={name} onChange={setName} id="name" label={"Proposal Title"} placeholder="e.g Save our Planet" error={nameError} helperText={"Proposal Title should have at least 3 words"}  />

            <Textarea value={description} onChange={setDescription} id="description" label={"Proposal Description"} placeholder="e.g Contribute and saving the planet in a decentralized manner" error={descriptionError} helperText={"Descripion should contain 10 - 50 words"}></Textarea>

            <div className="grid grid-cols-2 gap-4">

                <Select label={"Voting Delay"} id={"delays"} lists={delays} onChange={setDelay} />

                <Select label={"Voting Duration"} id={"duration"} lists={durationLists} onChange={setDuration} />

            </div>

            <LoadingButton loading={create?.isLoading} disabled={isDisabled()} > Create Proposal</LoadingButton>

        </form>
    )
}

export default CreateProposalForm