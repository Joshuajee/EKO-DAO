import DonorsList from '@/components/pages/crowdfund/DonorsList';
import ProjectCard from '@/components/pages/crowdfund/ProjectCard';
import Container from '@/components/ui/Container';
import Layout from '@/components/ui/Layout';
import { proposalsDummy, votersDummy } from '@/libs/dummy';
import Head from 'next/head'
import { useRouter } from 'next/router';

export default function CrowdFund() {

  const router = useRouter()

  const id = router.query.id

  const proposal = proposalsDummy.find(proposal => proposal.id == id)


  if (!proposal) return null

  return (
    <Layout>
      <Head><title> Proposal </title></Head>

      <Container> 

        <div className='mt-20 grid grid-cols-1 md:grid-cols-3 gap-4'>

          <div className='col-span-2'><ProjectCard proposal={proposal}  expanded={true}/>  </div>

          <DonorsList donors={votersDummy} />

        </div>

      </Container>
    
    </Layout>
  )
}
