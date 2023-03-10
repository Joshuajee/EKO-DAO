import { createContext, useState, useEffect, useCallback } from "react";
import { useAccount, useContractRead } from "wagmi";
import adminFacetABI from "@/abi/contracts/facets/AdminFacet.sol/AdminFacet.json"
import { API_SERVER, contractAddress } from "@/libs/utils";
import axios from "axios";

const HOUR = 3600

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [isAdminLoggedIn, setIsAdminLoginIn] = useState(false)

    const { address, isConnected } = useAccount()

    const auth = useCallback(async() => {

        const res = await axios.post(`${API_SERVER}/admins/login`, {
            walletAddress: address
        })

        localStorage.setItem("auth-token", res?.data?.access_token)

        localStorage.setItem("auth-time", Number(new Date()))

    }, [address])

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
            //setIsAdminLoginIn(true)
            if (Number(localStorage.getItem("auth-time") + HOUR < Number(new Date()))) auth()
        } else {
            setIsAdmin(false)
            setIsAdminLoginIn(false)
        }
    }, [data, address, auth]);


    return(
        <AuthContext.Provider value={{isAdmin, isAdminLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
    
}