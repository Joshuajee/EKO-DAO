import ProposalCard from '@/components/pages/proposals/ProposalCard';
import VotersList from '@/components/pages/proposals/VotersList';
import Container from '@/components/ui/Container';
import Layout from '@/components/ui/Layout';
import ProposalFacetABI from '@/abi/contracts/facets/GovernanceFacet.sol/GovernanceFacet.json';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useContractRead } from 'wagmi';
import { contractAddress } from '@/libs/utils';
import LoadingScreen from '@/components/ui/screens/LoadingScreen';

export default function Proposal() {

  const router = useRouter()

  const id = router.query.id

  const { data, isError, isLoading, isSuccess } = useContractRead({
    address: contractAddress,
    abi: ProposalFacetABI,
    functionName: 'viewProposal',
    args: [id],
    watch: true,
  })

  return (
    <Layout>
      <Head><title> Proposal </title></Head>

      { isSuccess &&
        <Container> 
          <div className='mt-20 flex justify-center w-full'>
            <div className='max-w-5xl w-full'> 
              <ProposalCard proposal={data} expanded={true} />  
            </div> 
          </div>
        </Container>
      }

      {
        (isLoading || isError) && (
          <LoadingScreen isError={!isLoading} />
        )
      }
    
    </Layout>
  )
}
