import { useState, useEffect } from "react";
import Input from "@/components/ui/form/Input"
import { useContractWrite } from "wagmi";
import LoadingButtonSM from "@/components/ui/form/LoadingButtonSM";
import hackathonABI from "@/abi/contracts/Hackathon.sol/Hackathon.json";
import { isAddress } from "ethers/lib/utils.js";
import { toast } from "react-toastify";

const AwardForm = ({contract}) => {

    const [winner, setWinner] = useState(null);
    const [second, setSecond] = useState(null);
    const [third, setThird] = useState(null);

    const [winnerError, setWinnerError] = useState(null);
    const [secondError, setSecondError] = useState(null);
    const [thirdError, setThirdError] = useState(null);


    const selectWinner = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: contract,
        abi: hackathonABI,
        functionName: 'setWinner',
        args: [winner],
    })

    const selectSecond = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: contract,
        abi: hackathonABI,
        functionName: 'setFirstRunnerUp',
        args: [second],
    })

    const selectThird = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: contract,
        abi: hackathonABI,
        functionName: 'setSecondRunnerUp',
        args: [third],
    })

    useEffect(() => {
        if (selectWinner.isSuccess) {
          toast.success(`Winner Added Successfully`)

        }
        if (selectWinner.isError) toast.error(selectWinner?.error?.reason)

        if (selectSecond.isSuccess) {
            toast.success(`Winner Added Successfully`)
  
        }
        if (selectSecond.isError) toast.error(selectSecond?.error?.reason)

        if (selectThird.isSuccess) {
            toast.success(`Winner Added Successfully`)
  
        }
        if (selectThird.isError) toast.error(selectThird?.error?.reason)
    
    
    }, [
        selectWinner?.isSuccess, selectWinner?.isError, selectWinner?.error,
        selectSecond?.isSuccess, selectSecond?.isError, selectSecond?.error,
        selectThird?.isSuccess, selectThird?.isError, selectThird?.error
    ]);


    useEffect(() => {
        if (!isAddress(winner)) setWinnerError(true)
        else setWinnerError(false)

        if (!isAddress(second)) setSecondError(true)
        else setSecondError(false)

        if (!isAddress(third)) setThirdError(true)
        else setThirdError(false)
    }, [winner, second, third])
    
    
    return (
        <div>

            <div className="flex justify-between space-x-2">
                <div className="basis-9/12">
                    <Input 
                        value={winner} onChange={setWinner} id="winner" 
                        label={"Winner Address"} placeholder="Enter Winner Address" 
                        error={winnerError} helperText={"Invalid Address"}  />  
                </div>
                
                <div className="basis-3/12 mt-[28px]">
                    <LoadingButtonSM 
                        disabled={winnerError}
                        onClick={selectWinner?.write}
                        loading={selectWinner?.isLoading} 
                        className=" text-white basis-3/12 bg-red-600 hover:bg-red-700 h-10 rounded-lg">
                            Approve
                    </LoadingButtonSM> 
                </div>
            </div>

            <div className="flex justify-between space-x-2">
                <div className="basis-9/12">
                    <Input 
                        value={second} onChange={setSecond} 
                        id="Second" label={"Second Address"} 
                        placeholder="Enter Second Address" 
                        error={secondError} helperText={"Invalid Address"}  />
                </div>

                <div className="basis-3/12 mt-[28px]">
                    <LoadingButtonSM 
                        disabled={secondError}
                        onClick={selectSecond?.write}
                        loading={selectSecond?.isLoading} 
                        className=" text-white basis-3/12 bg-red-600 hover:bg-red-700 h-10 rounded-lg">
                            Approve
                    </LoadingButtonSM> 
                </div>
            </div>

            <div className="flex justify-between space-x-2">
                <div className="basis-9/12">
                    <Input 
                        value={third} onChange={setThird} id="third" 
                        label={"Third Address"} placeholder="Enter Second Runner up Address" 
                        error={thirdError} helperText={"Invalid Address"}  />
                </div>

                <div className="basis-3/12 mt-[28px]">
                    <LoadingButtonSM 
                        disabled={thirdError}
                        onClick={selectThird?.write}
                        loading={selectThird?.isLoading} 
                        className=" text-white basis-3/12 bg-red-600 hover:bg-red-700 h-10 rounded-lg">
                            Approve
                    </LoadingButtonSM> 
                </div>

            </div>

        </div>
    )
}

export default AwardForm