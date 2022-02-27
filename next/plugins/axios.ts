import Router from 'next/router'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import axios from 'axios'
import store from "@/store/index";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

api.interceptors.request.use(
    (req: AxiosRequestConfig) => {
        req.headers.token = localStorage.getItem("token")
        return req
    }
)

api.interceptors.response.use(
    (res: AxiosResponse) => {
        console.log(res.config.baseURL + res.config.url, res)
        if (Router.pathname == '/login' || Router.pathname == '/login/new') {
            Router.push('/');
        }
        return res
    },
    (err: AxiosError) => {
        console.error(err.response)
        if (err.response?.status == 429) {
            alert('一定時間にアクセスが集中したため、しばらくアクセスできません')
        }
        if (err.response?.status == 401) {
            localStorage.removeItem("token")
            store.dispatch({ type: "setLoginInfo", value: false })
            if (!(Router.pathname == '/login' || Router.pathname == '/login/new')) {
                Router.push('/login');
            }
        }
        throw { response: err.response }
    }
)