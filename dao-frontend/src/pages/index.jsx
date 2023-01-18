import Head from 'next/head'
import { useEffect } from 'react'



export default function Home() {


  useEffect(() => {
    
  }, [])

  return (
    <>
      <Head>
        <title>Eko DAO</title>
        <meta name="description" content="Ekolance, DAO" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        Hello World
      </main>
    </>
  )
}
