import { createContext, useState, useEffect, useCallback } from "react";
import { useAccount, useContractRead } from "wagmi";
import adminFacetABI from "@/abi/contracts/facets/AdminFacet.sol/AdminFacet.json"
import { contractAddress, logout } from "@/libs/utils";

const HOUR = 3500

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

    const { address, isConnected } = useAccount()

    const { data } = useContractRead({
        address: contractAddress,
        abi: adminFacetABI,
        functionName: 'isAdmin',
        args: [address],
        enabled: isConnected
    })
    
    const monitorSession = useCallback(() => {

        const interval = setInterval(() => {
            if (Number(localStorage.getItem("auth-time") + HOUR < Number(new Date()))) {
                logout()
            } else {
                setIsAdminLoggedIn(true)
                setIsAdmin(true)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    
    useEffect(() => {
        if (data) {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    }, [data, address]);

    useEffect(() => {
        if ((localStorage.getItem("auth-token"))) {
            monitorSession()
        } else {
            setIsAdminLoggedIn(false)
        }
    }, [data, address, monitorSession]);



    return(
        <AuthContext.Provider value={{isAdmin, isAdminLoggedIn, setIsAdminLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
    
}