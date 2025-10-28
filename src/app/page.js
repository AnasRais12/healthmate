"use client"
import { useEffect, useState } from 'react'
import Home from '@/components/userComponent/Home'
import { useAppUtils, useReduxState } from '@/hooks/useAppUtils'
import Dashboard from '@/components/userComponent/Dashboard'
import { useSession } from 'next-auth/react'
import { Box, CircularProgress } from '@mui/material'
import { googleUser } from '@/service/authService'
const page = () => {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const { dispatch, router } = useAppUtils();
  const { userInfo } = useReduxState()
  useEffect(() => {
    const fetchUser = async () => {

      if (session?.status === 'loading') {
        setLoading(true);
      }
      else if (session?.status === 'authenticated' || session?.status === 'unauthenticated') {
        setLoading(false);
      }

      if (session?.data?.user) {
        setLoading(true)
        try {
          await dispatch(googleUser({ email: session?.data?.user?.email }))

        } finally {
          setLoading(false)
        }

      }
    }
    if (!userInfo?._id)
      fetchUser()

  }, [session, session?.data?.user])

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: "100vh" }}><CircularProgress /></Box>;



  return (
    <>

      {userInfo?._id ? router.push('/dashboard') : <Home />}

    </>
  )
}

export default page
