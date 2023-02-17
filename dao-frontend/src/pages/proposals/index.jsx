import ProposalCard from '@/components/pages/proposals/ProposalCard';
import CategoryTab from '@/components/ui/navigation/CategoryTab';
import Container from '@/components/ui/Container';
import Layout from '@/components/ui/Layout';
import TopBanner from '@/components/ui/TopBanner';
import { proposalsDummy } from '@/libs/dummy';
import { tabs } from '@/libs/routes';
import Head from 'next/head'

export default function Proposals() {
  console.log(proposalsDummy[0])

  return (
    <Layout>
      <Head><title>Proposals </title></Head>
      <TopBanner> Vote on Community Improvement Proposals </TopBanner>

      <Container> 

        {/* <CategoryTab tabs={tabs} /> */}

        <div className='grid md:grid-cols-2 gap-4'>

          {proposalsDummy.map((proposal, index) =>  <ProposalCard key={index} proposal={proposal} />)}

        </div>

      </Container>
    
    </Layout>
  )
}
