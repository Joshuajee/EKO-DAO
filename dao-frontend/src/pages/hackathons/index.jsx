import HackathonCard from '@/components/pages/hackathons/HackathonCard';
import CategoryTab from '@/components/ui/navigation/CategoryTab';
import Container from '@/components/ui/Container';
import Layout from '@/components/ui/Layout';
import TopBanner from '@/components/ui/TopBanner';
import { proposalsDummy } from '@/libs/dummy';
import { tabsTwo } from '@/libs/routes';
import Head from 'next/head'


export default function Hackathons() {

  return (
    <Layout>
      <Head>
        <title> Hackathons </title>
      </Head>
      <TopBanner> Hey Hackers, go build amazing stuff</TopBanner>

      <Container> 

        <CategoryTab tabs={tabsTwo} />

        <div className='grid md:grid-cols-2 gap-4'>

          {proposalsDummy.map((proposal, index) =>  <HackathonCard key={index} proposal={proposal} />)}

        </div>

      </Container>

    </Layout>
  )
}
