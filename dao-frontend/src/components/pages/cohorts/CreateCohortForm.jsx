import Input from "@/components/ui/form/Input"
import { useState, useEffect, useLayoutEffect, useContext } from "react"
import wordsCount from 'words-count';
import { contractAddress, convertToWEI, getDate } from "@/libs/utils"
import { useContractWrite } from "wagmi";
import cohortFacetABI from '../../../abi/contracts/facets/CohortFactoryFacet.sol/CohortFactoryFacet.json';
import { toast } from "react-toastify";
import LoadingButton from "@/components/ui/form/LoadingButton";
import Textarea from "@/components/ui/form/Textarea";
import { getRandomInt } from "@/libs/dummy";
import AuthRequest from "@/libs/requests";
import { AuthContext } from "@/context/AuthContext";

const currentDate = getDate()

const CreateCohortForm = ({close}) => {

    const { isAdminLoggedIn } = useContext(AuthContext);

    const [loading, setLoading] = useState(false)

    const [id] = useState(Number(new Date()));
    const [name, setName] = useState("");

    const [startDate, setStartDate] = useState(currentDate);
    const [endDate, setEndDate] = useState(null);

    const [student, setStudent] = useState("");
    const [commitment, setCommitment] = useState("");

    const [description, setDescription] = useState("");

    // Errors 
    const [idError, setIdError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState("");

    const [startDateError, setStartDateError] = useState(false);
    const [endDateError, setEndDateError] = useState(false);

    const [studentError, setStudentError] = useState(false);
    const [commitmentError, setCommitmentError] = useState(false);

    const create = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: contractAddress,
        abi: cohortFacetABI,
        functionName: 'newCohort',
        args: [id, name, new Date(startDate).getTime(), new Date(endDate).getTime(), student, convertToWEI(commitment), description],
    })

    const submit = async(e) => {
        e.preventDefault()

        isAdminLoggedIn ? await httpCreate() : create?.write()
    }

    const httpCreate = async () => {

        setLoading(true)

        try {

            const request = new AuthRequest("/cohorts")
            
            const response = await request.post({
                name,
                startDate: startDate,
                endDate: endDate,
                size: Number(student),
                commitment: Number(commitment),
                briefDescription: description,
                exhaustiveDescription: "Why this training is important?, Training structure, Meet the team, Why should you apply for this training"
            })

            console.log(response)
            

        } catch (e) {
            console.error(e)
        }

        setLoading(false)

    }

    const isDisabled = () => {
        return idError || nameError || startDateError || endDateError || studentError || commitmentError
    }

    // Verify Id
    useLayoutEffect(() => {
        if (id.length < 1) setIdError(true)
        else setIdError(false)
    }, [id])

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

    // Student Size
    useEffect(() => {
        if (student <= 0 || student >= 120) setStudentError(true)
        else setStudentError(false)
    }, [student])

    // Commiment Fee
    useEffect(() => {
        if (commitment <= 0) setCommitmentError(true)
        else setCommitmentError(false)
    }, [commitment])


    useEffect(() => {

        if (create.isSuccess) {
            toast.success("Cohort Created Successfully")

            setTimeout(() => {
                close()
            }, 600)
        }

        if (create?.isError) {
            toast.error(create?.error?.reason)
        }

    }, [create.isLoading, create.isSuccess, create.isError, create.error, close])


    return (
        <form className="text-gray-700" onSubmit={submit}>

            <Input value={name} onChange={setName} id="name" label={"Cohort Title"} placeholder="e.g Solidity Bootcamp fall 2023" error={nameError} helperText={"Cohort Title should have at least 3 words"}  />

            <Textarea value={description} onChange={setDescription} id="description" label={"Funding Description"} placeholder="e.g Contribute and saving the planet in a decentralized manner" error={descriptionError} helperText={"Descripion should contain 10 - 50 words"}></Textarea>

            <div className="grid grid-cols-2 gap-4">

                <Input type="date" label={"Start Date"} value={startDate} onChange={setStartDate} />
                
                <Input type="date" label={"End Date"} min={startDate} value={endDate} onChange={setEndDate} />

                <Input type="number" label={"Student Size"} value={student} onChange={setStudent} error={studentError} helperText={"Student Size should be greater than zero and less than 120"} />
                
                <Input type="number" label={"Commitment Fee"} value={commitment} onChange={setCommitment} error={commitmentError} helperText={"Commitment Fee should be greater than zero"}  />

            </div>

            <LoadingButton loading={isAdminLoggedIn ? loading : create?.isLoading} disabled={isDisabled()} > Create Cohort</LoadingButton>

        </form>
    )
}

export default CreateCohortForm