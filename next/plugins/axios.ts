import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import axios from 'axios'

export const api = axios.create({
    // baseURL: 'https://app.rakuten.co.jp/',
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
        return err.response
    }
)