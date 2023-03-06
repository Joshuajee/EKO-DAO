import ProjectCard from '@/components/pages/crowdfund/ProjectCard';
import Container from '@/components/ui/Container';
import Layout from '@/components/ui/Layout';
import LoadingScreen from '@/components/ui/screens/LoadingScreen';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useContractRead } from 'wagmi';
import ProjectABI from '@/abi/contracts/CrowdFundProject.sol/Project.json';

export default function CrowdFund() {

  const router = useRouter()

  const { contract } = router.query

  const { data, isLoading, isSuccess, isError, } = useContractRead({
    address: contract,
    abi: ProjectABI,
    functionName: 'getProjectDetails',
    watch: true
  })

  return (
    <Layout>
      <Head><title> Crowdfund | Details </title></Head>

      { isSuccess && 
        <Container> 

          <div className='mt-20 flex justify-center w-full'>
            <div className='max-w-5xl w-full'> 
              <ProjectCard project={data} contract={contract}  expanded={true}/>   
            </div> 
          </div>

          {/* 
            <div className='mt-20 grid grid-cols-1 md:grid-cols-3 md:gap-4'>

              <div className='col-span-2 mb-4'>
                <ProjectCard project={data}  expanded={true}/>  
              </div>

              <DonorsList donors={data?.donors} />

            </div> 
          */}

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
