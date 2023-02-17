import { useState, useEffect, useContext } from 'react';
import CohortCard from '@/components/pages/cohorts/CohortCard';
import CategoryTab from '@/components/ui/navigation/CategoryTab';
import Container from '@/components/ui/Container';
import Layout from '@/components/ui/Layout';
import TopBanner from '@/components/ui/TopBanner';
import { tabsTwo } from '@/libs/routes';
import Head from 'next/head'
import { useAccount, useContractRead } from 'wagmi';
import cohortFacetABI from './../../abi/contracts/facets/CohortFactoryFacet.sol/CohortFactoryFacet.json'
import { contractAddress } from '@/libs/utils';
import CreateButton from '@/components/ui/CreateButton';
import CreateCohortForm from '@/components/pages/cohorts/CreateCohortForm';
import LoadingScreen from '@/components/ui/screens/LoadingScreen';
import { AuthContext } from '@/context/AuthContext';


export default function Cohorts() {

    const [show, setShow] = useState(false);

    const [data, setData] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const { isAdminLoggedIn } = useContext(AuthContext);

    const open = () => {
        setShow(true)
    }

    const close = () => {
        setShow(false)
    }

    const cohorts = useContractRead({
        address: contractAddress,
        abi: cohortFacetABI,
        functionName: 'cohorts',
    })

    useEffect(() => {
        setData(cohorts.data)
        setIsError(cohorts.isError)
        setIsSuccess(cohorts.isSuccess)
        setIsLoading(cohorts.isLoading)
    }, [cohorts]);

    return (
        <Layout>

            <Head><title>Cohorts</title></Head>

            <TopBanner>Register For Cohorts</TopBanner>

            { isSuccess &&
                <Container> 
                    {
                        data &&
                            <div className='grid md:grid-cols-2 gap-4'>
                                {data?.map((cohort, index) =>  <CohortCard key={index} cohort={cohort} />)}
                            </div>
                    }
                </Container>
            }


            {
                (isLoading || isError) && (
                    <LoadingScreen />
                )
            } 

            { isAdminLoggedIn &&
                <CreateButton title={"Create Cohort"} open={open} show={show} close={close}>
                    <CreateCohortForm close={close} />
                </CreateButton> 
            }

        </Layout>
    )
}
  