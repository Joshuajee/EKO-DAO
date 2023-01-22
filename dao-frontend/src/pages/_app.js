import '@/styles/globals.css'
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css';
 
const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})


export default function App({ Component, pageProps }) {

  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig> 
  )
}
