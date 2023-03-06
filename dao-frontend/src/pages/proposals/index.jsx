import { useState, useContext, useEffect } from 'react';
import ProposalCard from '@/components/pages/proposals/ProposalCard';
import Container from '@/components/ui/Container';
import Layout from '@/components/ui/Layout';
import TopBanner from '@/components/ui/TopBanner';
import Head from 'next/head'
import CreateButton from '@/components/ui/CreateButton';
import LoadingScreen from '@/components/ui/screens/LoadingScreen';
import { AuthContext } from '@/context/AuthContext';
import { useContractRead } from 'wagmi';
import { contractAddress } from '@/libs/utils';
import ProposalFacetABI from '@/abi/contracts/facets/GovernanceFacet.sol/GovernanceFacet.json';
import CreateProposalForm from '@/components/pages/proposals/CreateProposalForm';

const limit = 50

export default function Proposals() {

  const [show, setShow] = useState(false);

  const [data, setData] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [counts, setCounts] = useState(0)

  const { isAdminLoggedIn } = useContext(AuthContext);

  const open = () => {
    setShow(true)
  }

  const close = () => {
    setShow(false)
  }

  const proposalCount = useContractRead({
    address: contractAddress,
    abi: ProposalFacetABI,
    functionName: 'getNumberOfProposals',
    watch: true
  })

  const proposals = useContractRead({
    address: contractAddress,
    abi: ProposalFacetABI,
    functionName: 'getProposals',
    args: [counts, counts],
    watch: true,
    enabled: counts > 0,
  })

  useEffect(() => {
    setCounts(Number(proposalCount?.data?.toString()))
  }, [proposalCount?.data])

  useEffect(() => {
    if (proposals?.data) setData([...proposals?.data])
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
          <LoadingScreen isError={!isLoading} />
        )
      }

      { isAdminLoggedIn &&
        <CreateButton title={"Create a new Community Proposal"} open={open} show={show} close={close}>
          <CreateProposalForm close={close} />
        </CreateButton> 
      }
    
    </Layout>
  )
}
