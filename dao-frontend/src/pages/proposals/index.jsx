import ProposalCard from '@/components/pages/proposals/ProposalCard';
import Container from '@/components/ui/Container';
import Layout from '@/components/ui/Layout';
import TopBanner from '@/components/ui/TopBanner';
import Head from 'next/head'

export default function Proposals() {

  const proposals = Array(20).fill({ 
    id: 100,
    date: "FEB 03 2023", 
    topic: "Maker Teleport Temporary Shutdown, DAI Transfers, Starknet Contract Deauthorizations",
    content: "Temporarily shut down the L2 side of the teleport bridge on Optimism, Arbitrum, and Starknet; DAI transfers for SPF funding, Tech-Ops Core Unit, and GovComms severance; deauthorize the old Starknet contracts."
  })

  return (
    <Layout>
      <Head><title>Proposals </title></Head>
      <TopBanner> Vote on Community Improvement Proposals </TopBanner>

      <Container> 

        <div className='grid md:grid-cols-2 gap-4'>

          {proposals.map((proposal, index) =>  <ProposalCard key={index} proposal={proposal} />)}

        </div>

      </Container>
    
    </Layout>
  )
}
