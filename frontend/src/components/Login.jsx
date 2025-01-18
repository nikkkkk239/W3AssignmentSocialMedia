import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const {login ,isLoggingIn } = useAuthStore();
    const navigate = useNavigate();

    const handleLogin = async(e)=>{
        e.preventDefault();
        if(username.length == 0){
            toast.error("Username is required.")
            return;
        }
        if(password.length == 0){
            toast.error("Password is required.")
            return;
        }
        await login({username , password});
        navigate("/admin")
    }
  return (
    <section className="mt-40 ml-2 mr-2 max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
    <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Admin Login</h2>

    <form>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
                <input id="username" value={username} onChange={(e)=>setUsername(e.target.value)} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
                <input id="password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>


        </div>

        <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" onClick={handleLogin}>{isLoggingIn ? "...":"Login"}</button>
        </div>
    </form>
</section>
  )
}

export default Login