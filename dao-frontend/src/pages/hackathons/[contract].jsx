import HackathonCard from '@/components/pages/hackathons/HackathonCard';
import Container from '@/components/ui/Container';
import Layout from '@/components/ui/Layout';
import LoadingScreen from '@/components/ui/screens/LoadingScreen';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useContractRead } from 'wagmi';
import hackathonABI from "@/abi/contracts/Hackathon.sol/Hackathon.json"

export default function Hackathons() {

  const router = useRouter()

  const { contract } = router.query

  const { data, isLoading, isSuccess, isError } = useContractRead({
    address: contract,
    abi: hackathonABI,
    functionName: 'getHackathon',
    watch: true
  })


  return (
    <Layout>

      <Head><title> Hackathon | Details </title></Head>

      { isSuccess && 
          <Container> 
            <div className='mt-20 flex justify-center w-full'>
              <div className='max-w-5xl w-full'> 
                <HackathonCard hackathon={data} expanded={true} /> 
              </div>
            </div>
          </Container>
      }

      {
        (isLoading || isError) && (
          <LoadingScreen isError={isError} />
        )
      }
    
    </Layout>
  )
}
