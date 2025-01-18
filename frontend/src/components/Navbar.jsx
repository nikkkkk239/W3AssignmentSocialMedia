import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
function Navbar() {
    const {authUser ,logout } = useAuthStore()
    const navigate = useNavigate();
    const handleLogout = async()=>{
        console.log("Clicked.")
        await logout();
        navigate("/")
    }
  return (
    <nav className="bg-white shadow dark:bg-gray-800">
    <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        {authUser?.role != "admin" &&<NavLink to={"/"} className={({isActive}) => (isActive ? `text-gray-800 transition-colors duration-300 transform dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6` : `text-gray-800 transition-colors duration-300 transform dark:text-gray-200  mx-1.5 sm:mx-6`)}>home</NavLink>}


        {authUser?.role == "admin" && <NavLink to={"/admin"} className={({isActive}) => (isActive ? `text-gray-800 transition-colors duration-300 transform dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6` : `text-gray-800 transition-colors duration-300 transform dark:text-gray-200  mx-1.5 sm:mx-6`)} >Admin Page</NavLink>}

        {authUser ? 
            <div className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 bg-blue-500 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-blue-700 mx-1.5 sm:mx-6 cursor-pointer" onClick={handleLogout}>LogOut</div>
        : <NavLink to={"/login"} className={({isActive}) => (isActive ? `text-gray-800 transition-colors duration-300 transform dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6` : `text-gray-800 transition-colors duration-300 transform dark:text-gray-200  mx-1.5 sm:mx-6 cursor-pointer`)} >LogIn</NavLink>}

       

        

        
    </div>
</nav>
  )
}

export default Navbar