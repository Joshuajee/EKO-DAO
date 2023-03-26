import { useState, useEffect, useCallback, useContext } from 'react'
import Layout from '@/components/ui/Layout'
import Input from '@/components/ui/form/Input'
import LoadingButton from '@/components/ui/form/LoadingButton'
import { useAccount } from 'wagmi';
import axios from 'axios';
import { API_SERVER } from '@/libs/utils';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AuthContext } from '@/context/AuthContext';



export default function AdminLogin() {

    const account = useAccount()
    const router = useRouter()

    const  { setAdminLoggedIn } = useContext(AuthContext);

    const [isLoading, setIsloading] = useState()
    const [address, setAddress] = useState();
    const [password, setPassword] = useState();

    const login = useCallback(async() => {

        setIsloading(true)

        try {
            const res = await axios.post(`${API_SERVER}/admins/login`, {
                walletAddress: address,
                password
            })
    
            localStorage.setItem("auth-token", res?.data?.access_token)
            localStorage.setItem("auth-time", Number(new Date()))

            setAdminLoggedIn(true)

            setTimeout(() => {
                router.push("/admin")
            }, 3000)

            toast.success("Login successful, Redirecting...")

        } catch (e) {
            console.error(e)
        }

        setIsloading(false)

    }, [address, password, router])

    useEffect(() => {
        setAddress(account.address)
    }, [account?.address]);

    return (
        <Layout>

            <div className='flex justify-center items-center h-[600px] px-4'>

                <div className="text-gray-700 bg-white rounded-md p-4 md:px-4 shadow-lg w-full max-w-md">

                    <h3 className='text-center text-xl my-4'>Login To your Admin account</h3>

                    <Input name="wallet-address" label={"Enter your Address"} value={address} placeholder={"Your ethereum wallet address"} onChange={setAddress} />

                    <Input label={"Enter your password"} type={"password"} value={password} placeholder={"Your password"} onChange={setPassword} />

                    <LoadingButton 
                        loading={isLoading} 
                        //disabled={isDisabled()}   
                        onClick={login}
                        >
                            Login
                    </LoadingButton>
                        
                </div>

            </div>


        </Layout>
    )
}
