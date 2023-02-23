import ProposalCard from '@/components/pages/proposals/ProposalCard';
import VotersList from '@/components/pages/proposals/VotersList';
import Container from '@/components/ui/Container';
import Layout from '@/components/ui/Layout';
import { proposalsDummy, votersDummy } from '@/libs/dummy';
import Head from 'next/head'
import { useRouter } from 'next/router';

export default function Proposal() {

  const router = useRouter()

  const id = router.query.id

  const proposal = proposalsDummy.find(proposal => proposal.id == id)


  if (!proposal) return null

  return (
    <Layout>
      <Head><title> Proposal </title></Head>

      <Container> 

        <div className='mt-20 grid grid-cols-1 md:grid-cols-3 md:gap-4'>

          <div className='col-span-2 mb-4'><ProposalCard proposal={proposal} expanded={true} />  </div>

          <VotersList voters={votersDummy} />

        </div>

      </Container>
    
    </Layout>
  )
}
