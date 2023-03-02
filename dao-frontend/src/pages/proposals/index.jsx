import { useState, useContext, useEffect } from 'react';
import ProposalCard from '@/components/pages/proposals/ProposalCard';
import Container from '@/components/ui/Container';
import Layout from '@/components/ui/Layout';
import TopBanner from '@/components/ui/TopBanner';
import Head from 'next/head'
import CreateButton from '@/components/ui/CreateButton';
import CreateCrowdForm from '@/components/pages/crowdfund/CreateCrowdForm';
import LoadingScreen from '@/components/ui/screens/LoadingScreen';
import { AuthContext } from '@/context/AuthContext';
import { useContractRead } from 'wagmi';
import { contractAddress } from '@/libs/utils';
import proposalFacetABI from '@/abi/contracts/facets/AdminFacet.sol/AdminFacet.json';

export default function Proposals() {

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

  const proposals = useContractRead({
    address: contractAddress,
    abi: proposalFacetABI,
    functionName: 'proposals',
    watch: true
  })

  useEffect(() => {
    if (proposals?.data) setData([...proposals?.data].reverse())
    setIsError(proposals?.isError)
    setIsSuccess(proposals?.isSuccess)
    setIsLoading(proposals?.isLoading)
  }, [proposals?.data, proposals?.isError, proposals?.isSuccess, proposals?.isLoading]);


  const isSuccessful = isSuccess && proposals?.data?.length > 0


  return (
    <Layout>
      <Head><title>Proposals </title></Head>
      <TopBanner> Vote on Community Improvement Proposals </TopBanner>

      { isSuccessful &&
          <Container> 
            {
              data &&
                <div className='grid md:grid-cols-2 gap-4'>
                  {data?.map((proposal, index) =>  <ProposalCard key={index} proposal={proposal} />)}
                </div>
            }
          </Container>
      }

      {
        (isLoading || isError || !isSuccessful) && (
          <LoadingScreen isError={!isSuccessful} />
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
