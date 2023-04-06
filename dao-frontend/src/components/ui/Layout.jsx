import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { networkNameByChainId } from '@/libs/utils';
import Footer from './navigation/Footer';
import Navbar from './navigation/Navbar';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';

const CHAIN_ID = 80001

const Layout = ({children}) => {

    const [isWrongNet, setIsWrongNet] = useState(false);
    const { isConnected } = useAccount()
    const { chain } = useNetwork()
    const { switchNetwork } = useSwitchNetwork()

    useEffect(() => {
        if (isConnected && (chain.id != CHAIN_ID)) {
            setIsWrongNet(true)
        } else {
            setIsWrongNet(false)
        }
    }, [isConnected, chain?.id]);

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            {    
                isWrongNet &&        
                    <div className='fixed top-14 bg-orange-400 w-full z-10 text-center px-4 py-2'>
                        You are connected to 
                        <strong> {networkNameByChainId(chain?.id)} </strong> 
                        network please switch to  
                        <button onClick={() => switchNetwork?.(CHAIN_ID)} className='ml-2 underline font-bold'> Mumbai </button> 
                    </div>
            }
            <div className='flex-grow bg-slate-50'>{children}</div>
            <Footer />
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout