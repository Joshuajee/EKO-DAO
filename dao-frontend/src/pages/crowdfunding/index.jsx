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

  const { isAdminLoggedIn } = useContext(AuthContext);

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
    args: [50]
  })

  console.log(crowdFunds)

  useEffect(() => {
    setData(crowdFunds.data)
    setIsError(crowdFunds.isError)
    setIsSuccess(crowdFunds.isSuccess)
    setIsLoading(crowdFunds.isLoading)
  }, [crowdFunds]);

  return (
    <Layout>
      <Head>
        <title> Crowdfunding </title>
      </Head>

      <TopBanner>Donate to Crowdfunding Campaigns</TopBanner>

      { isSuccess &&
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
        (isLoading || isError) && (
          <LoadingScreen isError={isError} />
        )
      }

      { isAdminLoggedIn &&
          <CreateButton title={"Create a new Crowd fund Project"} open={open} show={show} close={close}>
            <CreateCrowdForm close={close} />
          </CreateButton> 
      }

    </Layout>
  )
}
