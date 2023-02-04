import Layout from '@/components/ui/Layout';
import TopBanner from '@/components/ui/TopBanner';
import Head from 'next/head'
import Dashboard from "../../components/dashboard";

export default function Cohorts() {
    return (
        <Layout>
            <Head>
                <title>Cohorts</title>
            </Head>
            <TopBanner>Register For Cohorts</TopBanner>
        </Layout>
    )
}
  