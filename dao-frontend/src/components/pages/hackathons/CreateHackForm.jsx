import Input from "@/components/ui/form/Input"
import { useState, useEffect } from "react"
import wordsCount from 'words-count';
import { contractAddress, convertToWEI, dateToTimeStamp, getDate, USDC } from "@/libs/utils"
import { useContractWrite } from "wagmi";
import { toast } from "react-toastify";
import LoadingButton from "@/components/ui/form/LoadingButton";
import Textarea from "@/components/ui/form/Textarea";
import HackathonFacetABI from '@/abi/contracts/facets/HackathonFacet.sol/HackathonFacet.json';
import Select from "@/components/ui/form/Select";
import { durationLists } from "@/libs/constants";

const maxNumAdmittable = 50000

const CreateHackForm = ({close}) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [delay, setDelay] = useState(durationLists[0].value);
    const [duration, setDuration] = useState(durationLists[0].value);

    const [first, setFirst] = useState(50)
    const [second, setSecond] = useState(30)
    const [third, setThird] = useState(20)
    const [minToken, setMinToken] = useState(null)

    // Errors 
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const [firstError, setFirstError] = useState(50)
    const [secondError, setSecondError] = useState(30)
    const [thirdError, setThirdError] = useState(20)
    const [minTokenError, setMinTokenError] = useState(null)

    const create = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: contractAddress,
        abi: HackathonFacetABI,
        functionName: 'newHackathon',
        args: [
            name, description, delay, duration, maxNumAdmittable, 
            first, second, third, convertToWEI(minToken)
        ],
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
            toast.success("Hackathon Created Successfully")
            close()
        }

        if (create.error) {
            toast.error(create?.error?.reason)
        }

    }, [create.isLoading, create.isSuccess, create.isError, create.error, close])

    
    return (
        <form className="text-gray-700 overflow-auto max-h-[80vh]" onSubmit={submit}>

            <Input value={name} onChange={setName} id="name" label={"Hackathon Title"} placeholder="e.g Save our Planet" error={nameError} helperText={"Hackathon Title should have at least 3 words"}  />

            <Textarea value={description} onChange={setDescription} id="description" label={"Hackathon Description"} placeholder="e.g Contribute and saving the planet in a decentralized manner" error={descriptionError} helperText={"Descripion should contain 10 - 50 words"}></Textarea>
            
            <div className="grid grid-cols-2 gap-4">

                <Select id="delay" label={"Registration Period"} onChange={setDelay} lists={durationLists} />

                <Select id="duration" label={"Hackathon Duration"} onChange={setDuration} lists={durationLists} />

                <Input type="number" label={"Winner %"} value={first} onChange={setFirst} error={firstError} helperText={"Should be less than 100 and greater than the rest"} />

                <Input type="number" label={"First Runner up %"} value={second} onChange={setSecond} error={secondError} helperText={"Should be less than 100 and less than second runner up"}  />

                <Input type="number" label={"Third Runner up %"} value={third} onChange={setThird} error={thirdError} helperText={"Should be less than 100 and less than second runner up"}  />

                <Input type="number" label={"Minimun Token"} value={minToken} onChange={setMinToken} error={minTokenError} helperText={"Should be less than 100 and less than second runner up"}  />

            </div>

            <LoadingButton loading={create?.isLoading} disabled={isDisabled()} > Create Hackathon</LoadingButton>

        </form>
    )
}

export default CreateHackForm