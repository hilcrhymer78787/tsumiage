import Router from 'next/router'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import axios from 'axios'
import store from "../store/index";

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
        if (Router.pathname == '/login' || Router.pathname == 'login/newUser') {
            Router.push('/');
        }
        return res
    },
    (err: AxiosError) => {
        console.error(err.response)
        if (err.response.status == 401) {
            localStorage.removeItem("token")
            store.dispatch({ type: "setLoginInfo", value: false })
            if (!(Router.pathname == '/login' || Router.pathname == 'login/newUser')) {
                Router.push('/login');
            }
        }
        throw { response: err.response }
    }
)