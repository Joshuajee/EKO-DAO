import { useState, useEffect } from 'react';
import { motion } from "framer-motion"
import Hamburger from 'hamburger-react';
import PropTypes from 'prop-types';
import { menuAnimate, container } from './animation';
import { useDimension } from '@/hooks/windows';
import { navigation } from '@/libs/routes';
import NavLink from './NavLink';
import ModalWrapper from '../ModalWrapper';
import WalletOptions from '../../connection/walletsOptions';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import truncateEthAddress from 'truncate-eth-address';
import { networkNameByChainId } from '@/libs/utils';


const HambuggerMenu = ({open, setOpen}) => {

    const { chain } = useNetwork()

    const { width } = useDimension()

    const [showOptions, setShowOptions] = useState(false)
    const [initialRender, setInitialRender] = useState("hidden")

    const { address, isConnected } = useAccount()
    const { disconnect } = useDisconnect()

    const handleClick = () => {
        setOpen(!open)
    }

    const closeOptions = () => {
        setShowOptions(false)
    }

    useEffect(() => {
        setTimeout(() => {
            setInitialRender("")
        }, 1000)
    }, []);

    return (
        <div className='md:hidden'>

            <Hamburger size={28} toggled={open} toggle={handleClick} />

            <motion.div 
                className={`left-[0px] top-0 absolute h-screen w-screen -z-10`} 
                variants={menuAnimate(width)}
                animate={open ? 'enter' : 'exit'}>

                    <div className={`${initialRender} h-screen w-screen bg-white pt-20`}>

                        {
                            navigation.map((nav, index) => (<NavLink key={index} name={nav.name} link={nav.href} icon={nav.icon} />))
                        }

                        { isConnected && (
                            <div className='flex flex-col items-center justify-center my-20 text-lg font-semibold'>
                                <p>Account: {truncateEthAddress(address)} </p>
                                <p>Network: {networkNameByChainId(chain.id)} </p>
                                <p>Chain ID: {chain.id} </p>
                            </div>)
                        }

                        <div className="absolute bottom-4 flex justify-center w-full px-4">
                            <button 
                                onClick={() => isConnected ? disconnect() : setShowOptions(true)}
                                className={`${ isConnected ? "bg-red-800 rounded-lg hover:bg-red-600" : "bg-blue-800 rounded-lg hover:bg-blue-600" } text-white py-3 px-20 w-full`}> 
                                { isConnected ? "Disconnect" : "Connect" } Wallet
                            </button>
                        </div>

                    </div>

            </motion.div>


            <ModalWrapper title={"Choose Wallet"} open={showOptions} handleClose={closeOptions}>
                <WalletOptions show={showOptions} close={closeOptions}/>
            </ModalWrapper>

        </div>
    )
}

HambuggerMenu.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
};

export default HambuggerMenu

