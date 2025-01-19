import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:`${import.meta.env.VITE_REACT_APP_BASEURL}api` ,
    withCredentials:true
})