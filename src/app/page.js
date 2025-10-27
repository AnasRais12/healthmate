"use client"
import { useEffect, useState } from "react";
import Home from '@/components/userComponent/Home'
import { useReduxState } from '@/hooks/useAppUtils'
import Dashboard from '@/components/userComponent/Dashboard'
const page = () => {
  const { userInfo } = useReduxState()
  return (
    <>

      {!userInfo?.id ? <Home /> : <Dashboard />}
    </>
  )
}

export default page
