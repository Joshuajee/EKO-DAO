import Head from 'next/head'
import HeroSection from '@/components/pages/landingPage/HeroSection'
import Feature from '@/components/pages/landingPage/Feature'
import Layout from '@/components/ui/Layout'
import FeatureTwo from '@/components/pages/landingPage/FeatureTwo'
import Container from '@/components/ui/Container'



export default function Admin() {

  return (
    <Layout>
        <Container> 
            <div className='mt-20 flex justify-center w-full'>
              <div className='max-w-5xl w-full'> 
                <div className="text-gray-700 bg-white rounded-md p-4 md:px-4 shadow-lg w-full max-h-[500px] overflow-x-hidden overflow-y-auto">

                </div>

              </div>
            </div>
        </Container>
    </Layout>
  )
}
