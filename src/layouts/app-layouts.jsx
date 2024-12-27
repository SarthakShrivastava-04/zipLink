import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '@/components/ScrollToTop'

function AppLayout() {
  return (
    <div>
      <main className='min-h-screen container'>
      <Header/>
      <ScrollToTop/>
      <Outlet/>
      </main>
      
      <div className='text-center py-8 bg-gray-900 mt-10'>
      Copyright © Sarthak.
      </div>
    </div>
  )
}

export default AppLayout
