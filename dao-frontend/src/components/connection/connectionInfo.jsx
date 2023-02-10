import { useDisconnect, useNetwork } from 'wagmi'
import truncAddress from 'truncate-eth-address'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types';
import { MdContentCopy } from "react-icons/md"
import { networkNameByChainId } from '@/libs/utils';



const ConnectionInfo = ({show, address, close}) => {

    const { chain } = useNetwork()

    const { disconnect } = useDisconnect()
    
    const copyAddress = () => {
        navigator.clipboard.writeText(address)
        toast.success("Address copied to clipboard")
    }

    return (
        <div className={`${show ? "" : "hidden"}`}>

            <div onClick={close} className='fixed top-0 left-0 w-screen h-screen'></div>

            <div className={`absolute shadow-2xl rounded-sm right-4 md:right-10 top-16 w-4/5 bg-white max-w-[400px] z-10 text-gray-700`}>
                
                <h2 className='border-b-2 text-sm p-2 border-r-slate-300'>ACTIVE ACCOUNT</h2>

                <div className='p-4'>

                    <p>Network: {networkNameByChainId(chain?.id)}</p>
            
                    <div className='flex justify-between my-2'> 

                        <div>Chain Id: {chain?.id}</div>
                        
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


ConnectionInfo.propTypes = {
    show: PropTypes.bool.isRequired,
    address: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired
};


export default ConnectionInfo