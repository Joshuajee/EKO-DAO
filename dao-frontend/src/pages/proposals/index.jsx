import Layout from '@/components/ui/Layout';
import TopBanner from '@/components/ui/TopBanner';
import Head from 'next/head'

export default function Proposals() {
  return (
    <Layout>
        <Head>
          <title>Proposals </title>
        </Head>
        <TopBanner> Vote on Community Improvement Proposals </TopBanner>
    </Layout>
  )
}
