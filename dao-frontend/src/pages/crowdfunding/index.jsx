import { useState, useEffect, useContext } from 'react';
import ProjectCard from '@/components/pages/crowdfund/ProjectCard';
import Container from '@/components/ui/Container';
import Layout from '@/components/ui/Layout';
import TopBanner from '@/components/ui/TopBanner';
import Head from 'next/head'
import LoadingScreen from '@/components/ui/screens/LoadingScreen';
import CreateButton from '@/components/ui/CreateButton';
import { useContractRead } from 'wagmi';
import crowdFundFacetABI from '@/abi/contracts/facets/CrowdFundFacet.sol/CrowdFundFacet.json';
import { contractAddress } from '@/libs/utils';
import { AuthContext } from '@/context/AuthContext';
import CreateCrowdForm from '@/components/pages/crowdfund/CreateCrowdForm';


export default function Crowdfunding() {

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

  const crowdFunds = useContractRead({
    address: contractAddress,
    abi: crowdFundFacetABI,
    functionName: 'getLastXProjectDetails',
    args: [50],
    watch: true,
  })

  useEffect(() => {
    if (crowdFunds?.data) setData([...crowdFunds?.data].reverse())
    setIsError(crowdFunds?.isError)
    setIsSuccess(crowdFunds?.isSuccess)
    setIsLoading(crowdFunds?.isLoading)
  }, [crowdFunds?.data, crowdFunds?.isError, crowdFunds?.isSuccess, crowdFunds?.isLoading]);

  const isSuccessful = isSuccess && crowdFunds?.data?.length > 0

  return (
    <Layout>
      <Head>
        <title> Crowdfunding </title>
      </Head>

      <TopBanner>Donate to Crowdfunding Campaigns</TopBanner>

      { isSuccessful &&
          <Container> 
            {
              data &&
                <div className='grid md:grid-cols-2 gap-4'>
                  {data?.map((project, index) =>  <ProjectCard key={index} project={project} />)}
                </div>
            }
          </Container>
      }

      {
        (isLoading || isError || !isSuccessful) && (
          <LoadingScreen isError={!isLoading} />
        )
      }

      { isAdmin &&
        <CreateButton title={"Create a new Crowd fund Project"} open={open} show={show} close={close}>
          <CreateCrowdForm close={close} />
        </CreateButton> 
      }

    </Layout>
  )
}
