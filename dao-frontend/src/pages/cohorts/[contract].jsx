import CohortCard from '@/components/pages/cohorts/CohortCard';
import StudentList from '@/components/pages/cohorts/StudentList';
import Container from '@/components/ui/Container';
import Layout from '@/components/ui/Layout';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useContractRead } from 'wagmi';
import { votersDummy } from '@/libs/dummy';
import cohortABI from './../../abi/contracts/Cohort.sol/Cohort.json'
import LoadingScreen from '@/components/ui/screens/LoadingScreen';

export default function Cohorts() {

  const router = useRouter()

  const { contract } = router.query

  const { data, isLoading, isSuccess, isError } = useContractRead({
    address: contract,
    abi: cohortABI,
    functionName: 'cohort',
    //watch: true
  })

  return (
    <Layout>

      <Head><title> Chort | Details </title></Head>

      { isSuccess && 
          <Container> 

            <div className='mt-20 grid grid-cols-1 md:grid-cols-3 md:gap-4'>

              <div className='col-span-2 mb-4'>
                <CohortCard cohort={data} expanded={true}/>  
              </div>

              <StudentList students={votersDummy} /> 

            </div>

          </Container>
      }

      {
        (isLoading || isError) && (
          <LoadingScreen isError={isError} />
        )
      }

    </Layout>
  )
}
