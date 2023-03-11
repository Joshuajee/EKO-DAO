import HackathonCard from '@/components/pages/hackathons/HackathonCard';
import Container from '@/components/ui/Container';
import Layout from '@/components/ui/Layout';
import { proposalsDummy, votersDummy } from '@/libs/dummy';
import Head from 'next/head'
import { useRouter } from 'next/router';

export default function Hackathons() {

  const router = useRouter()

  const { id } = router.query

  const proposal = proposalsDummy.find(proposal => proposal.id == id)

  if (!proposal) return null

  return (
    <Layout>

      <Head><title> Hackathon | Details </title></Head>

      <Container> 
        <div className='mt-20 flex justify-center w-full'>
          <div className='max-w-5xl w-full'> 
            <HackathonCard proposal={proposal}  expanded={true}/>
          </div> 
        </div>
      </Container>
    
    </Layout>
  )
}
