import Input from "@/components/ui/form/Input"
import { useState, useEffect, useContext } from "react"
import wordsCount from 'words-count';
import { contractAddress, convertToWEI } from "@/libs/utils"
import { useContractWrite } from "wagmi";
import ProposalFacetABI from '@/abi/contracts/facets/GovernanceFacet.sol/GovernanceFacet.json';
import { toast } from "react-toastify";
import LoadingButton from "@/components/ui/form/LoadingButton";
import Textarea from "@/components/ui/form/Textarea";
import Select from "@/components/ui/form/Select";
import { delays, durationLists } from "@/libs/constants";
import AuthRequest from "@/libs/requests";
import { AuthContext } from "@/context/AuthContext";

const CreateProposalForm = ({close}) => {

    const {  isAdminLoggedIn  } = useContext(AuthContext);

    const [loading, setLoading] = useState(false)

    const [name, setName] = useState("");

    const [description, setDescription] = useState("");
    const [delay, setDelay] = useState(delays[0]?.value);
    const [duration, setDuration] = useState(durationLists[0]?.value);

    const [minToken, setMinToken] = useState();

    // Errors 
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [minTokenError, setMinTokenError] = useState(false);

    const create = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: contractAddress,
        abi: ProposalFacetABI,
        functionName: 'newProposal',
        args: [name, description, delay, duration, minToken],
    })

    const isDisabled = () => {
        return nameError || descriptionError 
    }

    const httpCreate = async () => {

        setLoading(true)
        
        try {
            const request = new AuthRequest("/improvement-proposals")
            
            await request.post({
                name,
                description,
                delay,
                votingDuration: Number(duration),
                minVotingTokenRequired: Number(minToken)
            })

            toast.success("Proposal Created Successfully")
            close()

        } catch (e) {
            console.error(e)
        }

        setLoading(false)
    }

    const submit = (e) => {
        e.preventDefault()
        isAdminLoggedIn ? httpCreate() : create?.write()
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

    // Min Token
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

            <Input value={minToken} onChange={setMinToken} id="min-eko" label={"Minimum Eko Token requirement"} placeholder="e.g 2000" error={minTokenError} helperText={"Should be greater than zero"}  />

            <LoadingButton loading={isAdminLoggedIn ? loading : create?.isLoading} disabled={isDisabled()} > Create Proposal</LoadingButton>

        </form>
    )
}

export default CreateProposalForm