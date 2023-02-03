import {  useConnect, useAccount } from 'wagmi'
import Wallet from './wallet'



const WalletOptions = ({show, close}) => {

    const { isConnected } = useAccount()

    const { connectors, error, isLoading, pendingConnector } = useConnect()

    if (isConnected) close()

    return (
        <div className={`${show ? "" : "hidden"}`}>

            <div onClick={close} className='fixed top-0 left-0 w-screen h-screen'></div>
    
            <div className={`absolute shadow-2xl right-4 md:right-10 top-20 w-4/5 border-solid border-2 bg-white max-w-[400px] z-1000`}>

                <h2 className='border-b-2 text-sm p-2 border-r-slate-300'>Choose Wallet</h2>

                <div className='p-4'>
         
                    <div className='grid grid-cols-2 my-2 gap-4'> 

                        {
                            connectors.map((connector, index) => {
                                return <Wallet key={index} connector={connector} />
                            })
                        }
                        
                    </div> 

                </div>

            </div>

        </div>
    )
}

export default WalletOptions