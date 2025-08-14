import { createContext,useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";

axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;


const AppContext =createContext()

export const AppProvider =({children})=>{

    const navigate=useNavigate()

    const [token,setToken]=useState(null)
    const [blogs,setBlogs]=useState([])
    const [input,setInput]=useState("")

    const fetchBlogs =async()=>{
        try {
            const {data}=await axios.get('/api/blog/all')
            data.success? setBlogs(data.blogs):toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }

    }

    useEffect(()=>{
       
        const token =localStorage.getItem('token')
        if(token){
            setToken(token)
            axios.defaults.headers.common['Authorization']=`Bearer ${token}`
        }
         fetchBlogs();
    },[fetchBlogs])


    const value={
        axios,input,setInput,blogs,setBlogs,token,setToken,navigate
    }
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext=()=>{
    return useContext(AppContext)
};