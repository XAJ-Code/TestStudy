import axios from "axios";

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_BASE_API
})

axiosInstance.interceptors.response.use(response =>{
    if(response.data){
        return response.data
    }
},(error)=>{
    //处理错误
    console.log(error);
    return Promise.reject(error)
})

export default axiosInstance;