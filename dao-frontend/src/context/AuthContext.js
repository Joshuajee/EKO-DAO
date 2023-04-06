import { createContext, useState, useEffect, useCallback } from "react";
import { useAccount, useContractRead } from "wagmi";
import adminFacetABI from "@/abi/contracts/facets/AdminFacet.sol/AdminFacet.json"
import { contractAddress } from "@/libs/utils";

const HOUR = 3500000

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
    const [adminAddr, setAdminAddr] = useState(null)

    const { address, isConnected } = useAccount()

    const { data } = useContractRead({
        address: contractAddress,
        abi: adminFacetABI,
        functionName: 'isAdmin',
        args: [address],
        enabled: isConnected
    })

    const login = (accessToken = null) => {
        if (accessToken) {
            localStorage.setItem("auth-token", accessToken)
            localStorage.setItem("auth-time", Number(new Date()))
        }
        setIsAdmin(true)
        setIsAdminLoggedIn(true)
    }

    const logout = useCallback(() => {
        localStorage.removeItem("auth-token")
        localStorage.removeItem("auth-time")
        setIsAdminLoggedIn(false)
        if (address != adminAddr) setIsAdmin(false)
    }, [address, adminAddr])
    
    const monitorSession = useCallback(() => {

        const authTime = Number(localStorage.getItem("auth-time"))
        const currentTime = Number(new Date())

        const interval = setInterval(() => {
            if (localStorage.getItem("auth-token") && authTime > 0)
                if ((authTime + HOUR) < currentTime) {
                  logout()
                }
        }, 1000)

        return () => clearInterval(interval)

    }, [logout])
    
    useEffect(() => {
        if (data) {
            setIsAdmin(true)
            setAdminAddr(address)
        } else {
            setIsAdmin(false)
        }
    }, [data, address]);

    useEffect(() => {
        if (localStorage.getItem("auth-token"))  {
            login()
        }
    }, [])

    useEffect(() => {
        monitorSession()
    }, [monitorSession]);

    return(
        <AuthContext.Provider value={{isAdmin, isAdminLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
    
}