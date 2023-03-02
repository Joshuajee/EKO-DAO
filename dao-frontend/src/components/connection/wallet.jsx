import Image from 'next/image';
import { useConnect } from 'wagmi'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types';



const Wallet = ({connector}) => {

    const { connect, error  } = useConnect()

    if (error) toast(error)

    const icon = (id) => {
        switch(id) {
            case "walletConnect":
                return  <Image alt={connect.name} src="/icons/walletconnect-logo.png" height={40} width={40} />
            case "coinbaseWallet":
                return <Image alt={connect.name} src="/icons/coinbasewallet-logo.png" height={40} width={40} />
            default:
                return  <Image alt={connect.name} src="/icons/metamask-logo.png" height={40} width={40} />
        }
    }

    return (
        <button 
            className='flex flex-col rounded-lg w-full h-24 md:h-auto aspect-video shadow-lg items-center justify-center'
            onClick={() => connect({ connector })}>
            {icon(connector.id)}
            <p> {connector.name} </p>
        </button>
    )
}


Wallet.propTypes = {
    connector: PropTypes.object.isRequired
};


export default Wallet