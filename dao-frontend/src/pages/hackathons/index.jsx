import { useState, useEffect, useContext } from 'react';
import HackathonCard from '@/components/pages/hackathons/HackathonCard';
import Container from '@/components/ui/Container';
import Layout from '@/components/ui/Layout';
import TopBanner from '@/components/ui/TopBanner';
import Head from 'next/head'
import CreateButton from '@/components/ui/CreateButton';
import LoadingScreen from '@/components/ui/screens/LoadingScreen';
import { AuthContext } from '@/context/AuthContext';
import { useContractRead } from 'wagmi';
import { contractAddress } from '@/libs/utils';
import HackathonFacetABI from '@/abi/contracts/facets/HackathonFacet.sol/HackathonFacet.json';
import CreateHackForm from '@/components/pages/hackathons/CreateHackForm';


export default function Hackathons() {

  const [show, setShow] = useState(false);

  const [data, setData] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { isAdmin } = useContext(AuthContext);

  const open = () => {
    setShow(true)
  }

  const close = () => {
    setShow(false)
  }

  const hackathonCount = useContractRead({
    address: contractAddress,
    abi: HackathonFacetABI,
    functionName: 'numberofHackathons',
    watch: true
  })

  const hackathons = useContractRead({
    address: contractAddress,
    abi: HackathonFacetABI,
    functionName: 'hackathons',
    watch: true,
    enabled: false
  })

  useEffect(() => {
    if (hackathons?.data) setData([...hackathons?.data].reverse())
    setIsError(hackathons?.isError)
    setIsSuccess(hackathons?.isSuccess)
    setIsLoading(hackathons?.isLoading)
  }, [hackathons?.data, hackathons?.isError, hackathons?.isSuccess, hackathons?.isLoading]);

  const isSuccessful = isSuccess && hackathons?.data?.length > 0

  return (
    <Layout>
      <Head>
        <title> Hackathons </title>
      </Head>

      <TopBanner> Hey Hackers, go build amazing stuff</TopBanner>

      { 
        isSuccessful &&
          <Container> 
            {
              data &&
                <div className='grid md:grid-cols-2 gap-4'>
                  { data?.map((hackathon, index) =>  <HackathonCard key={index} hackathon={hackathon} />)}
                </div>
            }
          </Container>
      }

      {
        (
          isLoading || isError || !isSuccessful) && (
            <LoadingScreen isError={!isLoading} />
        )
      } 

      { 
        isAdmin &&
          <CreateButton title={"Create Hackathon"} open={open} show={show} close={close}>
            <CreateHackForm close={close} />
          </CreateButton> 
      }

    </Layout>
  )
}
