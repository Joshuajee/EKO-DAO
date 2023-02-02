import TopNav from '../components/topNavBar'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { routes } from '../libs/routes'



export default function Home() {

  return (
    <>
      <Head>
        <title>Eko DAO</title>
        <meta name="description" content="Ekolance, DAO" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-[#111827] h-screen">

        <TopNav />

        <div className='p-4 flex justify-center items-center h-full text-white'>

          <div data-aos="fade-up" className='flex flex-col items-center'>
            
            <h1 className='my-4 text-3xl sm:text-4xl text-gradient-to-r from-indigo-500 '>Welcome to EkoDAO </h1>

            <p className='text-center font-semibold mb-4 max-w-lg'>
              Ekolance Governance at your fingertip, Vote, Fund Community project and Join Hackathons.
            </p>

            <Link href={routes.dashboard}>
              <button className='text-xl px-20 rounded-lg h-14 text-md bg-blue-800 text-white hover:bg-blue-900'> Explore </button>
            </Link>
          
          </div>
          
        </div>
  
      </main>
    </>
  )
}
