import { createContext, useState, useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [isAdminLoggedIn, setIsAdminLoginIn] = useState(false)

    const { isConnected } = useAccount()

    //const { data, isLoading, isError } = useContractRead()
    
    useEffect(() => {
        if (isConnected) {
            setIsAdmin(true)
            setIsAdminLoginIn(true)
        } else {
            setIsAdmin(false)
            setIsAdminLoginIn(false)
        }
    }, [isConnected]);


    return(
        <AuthContext.Provider value={{isAdmin, isAdminLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
    
}