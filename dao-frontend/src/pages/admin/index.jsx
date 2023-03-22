import { useEffect } from 'react'
import Layout from '@/components/ui/Layout'
import Container from '@/components/ui/Container'
import { useRouter } from 'next/router'
import LoadingButton from '@/components/ui/form/LoadingButton'
import LoadingButtonSM from '@/components/ui/form/LoadingButtonSM'
import { logout } from '@/libs/utils'



export default function Admin() {

  const router = useRouter()

  useEffect(() => {
    if (!(localStorage.getItem("auth-token"))) router.push("/admin/login")
  }, [router]);

  const handleClick = () => {
    logout()
    router.push("/admin/login")
  }

  return (
    <Layout>
        <Container> 
            <div className='mt-20 flex justify-center w-full'>
              <div className='max-w-5xl w-full'> 
                
                <div className="text-gray-700 bg-white rounded-md p-4 md:px-4 shadow-lg w-full max-h-[500px] overflow-x-hidden overflow-y-auto">

                  <div className='flex justify-center'>

                    <LoadingButton onClick={handleClick} color="red">Logout</LoadingButton>

                  </div>

                </div>

              </div>

            </div>

        </Container>
        
    </Layout>
  )
}
