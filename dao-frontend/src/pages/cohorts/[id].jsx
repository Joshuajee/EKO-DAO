import CohortCard from '@/components/pages/chorts/CohortCard';
import StudentList from '@/components/pages/chorts/StudentList';
import Container from '@/components/ui/Container';
import Layout from '@/components/ui/Layout';
import { cohortsDummy, votersDummy } from '@/libs/dummy';
import Head from 'next/head'
import { useRouter } from 'next/router';

export default function Cohorts() {

  const router = useRouter()

  const { id } = router.query

  const cohort = cohortsDummy.find(cohort => cohort.id == id)

  if (!cohort) return null

  return (
    <Layout>

      <Head><title> Chort | Details </title></Head>

      <Container> 

        <div className='mt-20 grid grid-cols-1 md:grid-cols-3 gap-4'>

          <div className='col-span-2'><CohortCard cohort={cohort}  expanded={true}/>  </div>

          <StudentList students={votersDummy} />

        </div>

      </Container>
    
    </Layout>
  )
}