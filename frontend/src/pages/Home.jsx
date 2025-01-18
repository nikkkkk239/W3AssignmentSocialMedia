import React from 'react'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div className='flex content-center w-full h-fit justify-center'>
        <Outlet/>
    </div>
  )
}

export default Home