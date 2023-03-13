import { useState } from 'react'
import Layout from '@/components/ui/Layout'
import Input from '@/components/ui/form/Input'
import LoadingButton from '@/components/ui/form/LoadingButton'



export default function AdminLogin() {

    const [address, setAddress] = useState();
    const [password, setPassword] = useState();

    return (
        <Layout>

            <div className='flex justify-center items-center h-[600px] px-4'>

                <div className="text-gray-700 bg-white rounded-md p-4 md:px-4 shadow-lg w-full max-w-md">

                    <h3 className='text-center text-xl my-4'>Login To your Admin account</h3>

                    <Input name="wallet-address" label={"Enter your Address"} value={address} placeholder={"Your ethereum wallet address"} onChange={setAddress} />

                    <Input label={"Enter your password"} type={"password"} value={password} placeholder={"Your ethereum wallet address"} onChange={setPassword} />

                    <LoadingButton 
                        //loading={mint?.isLoading} 
                        //disabled={isDisabled()}   
                        //onClick={mint?.write}
                        >
                            Login
                    </LoadingButton>
                        
                </div>

            </div>


        </Layout>
    )
}
