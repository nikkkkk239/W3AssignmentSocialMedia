import {create} from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import {toast} from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE ==="development" ?"http://localhost:5000" : "/";

export const useAuthStore = create((set,get)=>({
    authUser : null,
    isCheckingAuth : true,
    isLoggingIn : false,
    isAddingTask:false,
    mediaDetails : [],
    onlineUsers : [],
    socket:null,
    isMediaLoading : false,
    checkAuth : async()=>{
        try {
            const response = await axiosInstance.get("/auth/checkAuth");
            set({authUser : response.data});
            get().connectSocket();
        } catch (error) {
            console.log(error);
            set({authUser : null})
        }
        finally{
            set({isCheckingAuth : false})
        }
    },
    login:async(details)=>{
        try {
            set({isLoggingIn : true});
            const response = await axiosInstance.post("/auth/login",details);
            set({authUser : response.data})
            get().connectSocket();
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        }
        finally{
            set({isLoggingIn : false});
        }
    },
    addTask : async(details)=>{
        try {
            set({isAddingTask : true})
            const response = await axiosInstance.post("/auth/addTask",details);
            toast.success(`${response.data.name.slice(0,15)}'s details added.`)
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        }
        finally{
            set({isAddingTask:false})
        }
    },
    logout : async()=>{
        try {
            const response = await axiosInstance.post("/auth/logout");
            toast.success("Logout Successfully .")
            set({authUser : null});
            get().disconnectSocket();
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        }
    },
    getTaskDetails : async()=>{
        try {
            set({isMediaLoading : true});
            const response = await axiosInstance.get("/admin/getDetails");
            set({mediaDetails : response.data})
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        }finally{
            set({isMediaLoading : false});
        }
    }, connectSocket: async () => {
        const { authUser, socket } = get();
        if (!authUser || socket?.connected) return;
    
        if (socket) {
            socket.disconnect();
            socket.removeAllListeners(); 
        }
        const newSocket = io(BASE_URL, {
            query: { userId: authUser._id },
            reconnection: true, 
            reconnectionAttempts: 5, 
            reconnectionDelay: 1000, 
        });
    
        set({ socket: newSocket });
    
        newSocket.on("connect", () => {
            console.log("Socket connected: ", newSocket.id);
            set({ isSocketConnected: true });
        });
    
        newSocket.on("getOnlineUsers", (data) => {
            console.log("Received online users: ", data);
            set({ onlineUsers: data }); 
        });
    
        newSocket.on("connect_error", (err) => {console.error("Socket connection error: ", err.message);
        });
    
        newSocket.on("disconnect", () => {
            console.log("Socket disconnected.");
            set({ isSocketConnected: false }); 
        });
    }
    ,
    disconnectSocket : ()=>{
        if(get().socket?.connected) get().socket?.disconnect()
    },
    listenToTasks:()=>{
        console.log("Inside listen task")
        const socket = get().socket;
        socket?.on("newTask",(data)=>{
            console.log("Sucess bitch.");
            set({mediaDetails:[...get().mediaDetails , data]});
        })
    },
    unListenToTask:()=>{
        const socket = get().socket;
        socket?.off("newTask")
    }
}))