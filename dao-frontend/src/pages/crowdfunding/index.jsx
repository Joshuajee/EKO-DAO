import ProjectCard from '@/components/pages/crowdfund/ProjectCard';
import CategoryTab from '@/components/ui/CategoryTab';
import Container from '@/components/ui/Container';
import Layout from '@/components/ui/Layout';
import TopBanner from '@/components/ui/TopBanner';
import { proposalsDummy } from '@/libs/dummy';
import { tabs } from '@/libs/routes';
import Head from 'next/head'


export default function Crowdfunding() {

  return (
    <Layout>
      <Head>
        <title> Crowdfunding </title>
      </Head>

      <TopBanner>Donate to Crowdfunding Campaigns</TopBanner>

      <Container> 

        <CategoryTab tabs={tabs} />

        <div className='grid md:grid-cols-2 gap-4'>

          {proposalsDummy.map((proposal, index) =>  <ProjectCard key={index} proposal={proposal} />)}

        </div>

      </Container>
    </Layout>
  )
}
