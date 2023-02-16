import '@/styles/globals.css'
import React from 'react'
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import AOS from 'aos'
import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '@/context/AuthContext'


const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: String(process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_KEY)}), publicProvider()],
)

 
const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: 'Metamask',
        shimDisconnect: true,
      },
    }),
    // new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'EkoDAO',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})


const App = ({ Component, pageProps }) => {

  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  React.useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, [])

  return (
    <WagmiConfig client={client}>
      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer autoClose={3000} hideProgressBar={true} />
      </AuthProvider>
    </WagmiConfig> 

  )
}


export default App