import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import truncAddress from 'truncate-eth-address'
import { AiOutlineWallet } from 'react-icons/ai'
import  { RxCaretDown } from 'react-icons/rx'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { MdContentCopy } from "react-icons/md"


const ConnectionBtn = () => {

    const { address, isConnected } = useAccount()
    const [show, setShow] = useState(false)

    const { connect } = useConnect({
      connector: new InjectedConnector(),
      onError: (e) =>  toast.error(e.message)
    })

    const { disconnect } = useDisconnect()

    const close  = () => {
        setShow(false)
    }

    const copyAddress = () => {
        navigator.clipboard.writeText(address)
        toast.success("Address copied to clipboard")
    }

    return (
        <div>
            
            { !isConnected &&
                <button 
                    onClick={() => connect()}
                    className="px-6 md:px-10 rounded-lg h-10 text-sm bg-blue-800 text-white hover:bg-blue-900">
                    Connect Wallet 
                </button>

            }

            {

                isConnected &&  (
                    <div onClick={() => setShow(!show)} className='w-44 flex items-center cursor-pointer'>

                        <AiOutlineWallet className='mr-2' size={"2em"} />

                        <span> {truncAddress(String(address))}  </span>    

                        <RxCaretDown className='ml-2' />

                    </div>
                )

            }

            <div className={`${show ? "" : "hidden"} absolute right-4 md:right-10 top-20 w-4/5 border-solid border-2 bg-white max-w-[400px] z-10`}>
                
                <h2 className='border-b-2 text-sm p-2 border-r-slate-300'>ACTIVE ACCOUNT</h2>

                <div className='p-4'>
         
                    <div className='flex justify-between my-2'> 

                        <div>Metamask</div>
                     
                        <div className='flex'>
                            <p className='mr-2'>{truncAddress(String(address))} </p>

                            <button onClick={copyAddress}>
                                <MdContentCopy />
                            </button>
                        
                        </div>
                        
                    </div> 

                    <button 
                        onClick={() => { disconnect(); close(); }} 
                        className='w-full bg-red-700 hover:bg-red-800 rounded-lg p-2 text-white'> Disconnect Wallet </button>

                </div>

            </div>

        </div>
    )
}

export default ConnectionBtn