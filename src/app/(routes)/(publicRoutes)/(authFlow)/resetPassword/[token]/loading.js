"use client"
import React from 'react'
import { CircularProgress } from '@mui/material'

const loading = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <CircularProgress />
    </div>
  )
}

export default loading
