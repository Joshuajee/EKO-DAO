import Layout from '@/components/ui/Layout';
import TopBanner from '@/components/ui/TopBanner';
import Head from 'next/head'


export default function Crowdfunding() {
  return (
    <Layout>
      <Head>
        <title> Crowdfunding </title>
      </Head>
      <TopBanner>Donate to Crowdfunding Campaigns</TopBanner>
    </Layout>
  )
}
