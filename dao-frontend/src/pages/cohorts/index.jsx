import CohortCard from '@/components/pages/chorts/CohortCard';
import CategoryTab from '@/components/ui/CategoryTab';
import Container from '@/components/ui/Container';
import Layout from '@/components/ui/Layout';
import TopBanner from '@/components/ui/TopBanner';
import { proposalsDummy } from '@/libs/dummy';
import { tabsTwo } from '@/libs/routes';
import Head from 'next/head'


export default function Cohorts() {

    return (
        <Layout>
            <Head><title>Cohorts</title></Head>

            <TopBanner>Register For Cohorts</TopBanner>

            <Container> 

                <CategoryTab tabs={tabsTwo} />

                <div className='grid md:grid-cols-2 gap-4'>

                    {proposalsDummy.map((proposal, index) =>  <CohortCard key={index} proposal={proposal} />)}

                </div>

            </Container>

        </Layout>
    )
}
  