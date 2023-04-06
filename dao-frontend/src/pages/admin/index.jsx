import { useEffect } from 'react'
import Layout from '@/components/ui/Layout'
import { useRouter } from 'next/router'


export default function Admin() {

  const router = useRouter()

  useEffect(() => {
    if (!(localStorage.getItem("auth-token"))) router.push("/admin/login")
    else router.push("/admin/logout")
  }, [router]);

  return (
    <Layout>
      
    </Layout>
  )

}
