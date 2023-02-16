import { createContext, useState, useEffect } from "react";
import { useConnect, useContractRead } from "wagmi";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [isAdminLoggedIn, setIsAdminLoginIn] = useState(false)

    const { address } = useConnect()

    const { data, isLoading, isError } = useContractRead()
    
    useEffect(() => {
        setIsAdmin(true)
        setIsAdminLoginIn(true)
    }, [address]);


    return(
        <AuthContext.Provider value={{isAdmin, isAdminLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
    
}