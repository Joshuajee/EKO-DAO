import Head from 'next/head'
import HeroSection from '@/components/pages/landingPage/HeroSection'
import Feature from '@/components/pages/landingPage/Feature'
import Layout from '@/components/ui/Layout'
import FeatureTwo from '@/components/pages/landingPage/FeatureTwo'



export default function Home() {

  return (
    <Layout>

      <Head>
        <title>Eko DAO</title>
        <meta name="description" content="Ekolance, DAO" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroSection />
      <Feature />
      <FeatureTwo />

    </Layout>
  )
}
