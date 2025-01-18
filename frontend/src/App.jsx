import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Toaster } from 'react-hot-toast'
import {Routes , Route , Navigate} from "react-router-dom"
import Home from './pages/Home'
import AdminPage from './pages/AdminPage'
import { useAuthStore } from './store/useAuthStore'
import Navbar from './components/Navbar'
import UserForm from './components/UserForm'
import Login from './components/Login'
import NotFound from './pages/NotFound'

function App() {
  const {authUser , isCheckingAuth , checkAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  if(isCheckingAuth){
    return <div>Loading...</div>
  }

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}>
          <Route index path='/' element={authUser?.role == "admin" ?<Navigate to={"/admin"}/>: <UserForm/>}/>
          <Route path='/login' element={authUser ?<Navigate to={"/admin"}/> :<Login/>  }/>
          <Route path='/admin' element={authUser  ? <AdminPage/> : <Navigate to={"/login"}/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
