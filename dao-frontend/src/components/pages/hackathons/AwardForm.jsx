import { useState, useEffect, useContext } from "react";
import Input from "@/components/ui/form/Input"
import { useContractWrite } from "wagmi";
import { isAddress } from "ethers/lib/utils.js";
import { toast } from "react-toastify";
import LoadingButton from "@/components/ui/form/LoadingButton";
import HackathonFacetABI from '@/abi/contracts/facets/HackathonFacet.sol/HackathonFacet.json';
import { contractAddress } from "@/libs/utils";
import AuthRequest from "@/libs/requests";
import { AuthContext } from "@/context/AuthContext";


const AwardForm = ({id, contract, close}) => {

    const { isAdminLoggedIn } = useContext(AuthContext);

    const [loading, setLoading] = useState(false)

    const [winner, setWinner] = useState(null);
    const [second, setSecond] = useState(null);
    const [third, setThird] = useState(null);

    const award = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: contractAddress,
        abi: HackathonFacetABI,
        functionName: 'setPrizeWinners',
        args: [id, winner, second, third],
    })

    const awardPrizeHttp = async () => {

        setLoading(true)

        try {

            const request = new AuthRequest(`/hackathons/winners/${id}`)
            
            await request.post({
                winner,
                firstRunnerUp: second,
                secondRunnerUp: third
            })

            toast.success("Awarded Successfully")

            close()

        } catch (e) {
            console.error(e)
        }

        setLoading(false)
    }

    useEffect(() => {
        if (award.isSuccess) {
            toast.success(`Winners Awarded Successfully`)
            close()
        }

        if (award.isError) toast.error(award?.error?.reason)
    
    }, [award?.isSuccess, award?.isError, award?.error, close])

    const disabled = !isAddress(winner) || !isAddress(second) || !isAddress(third)
    
    return (
        <div>

            <Input 
                value={winner} onChange={setWinner} id="winner" 
                label={"Winner Address"} placeholder="Enter Winner Address" 
                error={!isAddress(winner)} helperText={"Invalid Address"}  />  
                
            <Input 
                value={second} onChange={setSecond} 
                id="Second" label={"Second Address"} 
                placeholder="Enter Second Address" 
                error={!isAddress(second)} helperText={"Invalid Address"}  />

            <Input 
                value={third} onChange={setThird} id="third" 
                label={"Third Address"} placeholder="Enter Second Runner up Address" 
                error={!isAddress(third)} helperText={"Invalid Address"}  />

            <LoadingButton
                color="red"
                disabled={disabled}
                onClick={isAdminLoggedIn ? awardPrizeHttp : award?.write}
                loading={isAdminLoggedIn ? loading : award?.isLoading}>
                Award
            </LoadingButton>

        </div>
    )
}

export default AwardForm