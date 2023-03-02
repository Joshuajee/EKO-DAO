import { createContext, useState, useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";
import adminFacetABI from "@/abi/contracts/facets/AdminFacet.sol/AdminFacet.json"
import { contractAddress } from "@/libs/utils";



export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [isAdminLoggedIn, setIsAdminLoginIn] = useState(false)

    const { address, isConnected } = useAccount()

    const { data } = useContractRead({
        address: contractAddress,
        abi: adminFacetABI,
        functionName: 'isAdmin',
        args: [address],
        enabled: isConnected
    })

    
    useEffect(() => {
        if (data) {
            setIsAdmin(true)
            setIsAdminLoginIn(true)
        } else {
            setIsAdmin(false)
            setIsAdminLoginIn(false)
        }
    }, [data]);


    return(
        <AuthContext.Provider value={{isAdmin, isAdminLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
    
}