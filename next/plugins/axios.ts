import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:8000/',
})

api.interceptors.request.use(
    (req: AxiosRequestConfig) => {
        req.headers.token = localStorage.getItem("token")
        return req
    }
)

api.interceptors.response.use(
    (res: AxiosResponse) => {
        console.log(res)
        return res
    },
    (err: AxiosError) => {
        console.error(err.response)
        if(err.response.data.message){
            console.error(err.response.data.message)
        }
        return err.response
    }
)