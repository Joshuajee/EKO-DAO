import '@/styles/globals.css'
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import AOS from 'aos'
import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';
 
const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})


const App = ({ Component, pageProps }) => {

  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} hideProgressBar={true} />
    </WagmiConfig> 
  )
}


export default App