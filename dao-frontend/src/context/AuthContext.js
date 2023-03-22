import { createContext, useState, useEffect, useCallback } from "react";
import { useAccount, useContractRead } from "wagmi";
import adminFacetABI from "@/abi/contracts/facets/AdminFacet.sol/AdminFacet.json"
import { API_SERVER, contractAddress, logout } from "@/libs/utils";
import axios from "axios";

const HOUR = 3600

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
        } else {
            setIsAdmin(false)
        }
    }, [data, address]);

    useEffect(() => {
        if ((localStorage.getItem("auth-token"))) {
            if (Number(localStorage.getItem("auth-time") + HOUR < Number(new Date()))) {
                logout()
            } else {
                setIsAdminLoginIn(true)
                setIsAdmin(true)
            }
        } else {
            setIsAdminLoginIn(false)
            setIsAdmin(false)
        }
    }, [data, address]);



    return(
        <AuthContext.Provider value={{isAdmin, isAdminLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
    
}