import { createStore } from "redux";
import Router from 'next/router'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { api } from '@/plugins/axios';
import axios from 'axios'
import { apiUserBearerAuthenticationResponseType } from "@/types/api/user/bearerAuthentication/response"
import { apiWorkReadCalendarResponseType } from '@/types/api/work/read/calendar/response'
import { apiWorkReadCalendarRequestType } from '@/types/api/work/read/calendar/request'
const CancelToken = axios.CancelToken;
let setCalendarsCancel: any = null;
let setLoginInfoByTokenCancel: any = null;

const initialState = {
    loginInfo: null,
    calendars: [],
    count: 1,
    post: 100,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setLoginInfo':
            return { ...state, loginInfo: action.value, };
        case 'setCalendars':
            return { ...state, calendars: action.value, };
        case 'setCount':
            return { ...state, count: action.value, };
        case 'setPost':
            return { ...state, post: action.value, };
        default:
            return state;
    }
};
const store = createStore(reducer);

export const bearerAuthentication = async () => {
    if (setLoginInfoByTokenCancel) {
        setLoginInfoByTokenCancel()
    }
    const requestConfig: AxiosRequestConfig = {
        url: `/api/user/bearer_authentication`,
        method: "GET",
        cancelToken: new CancelToken(c => {
            setLoginInfoByTokenCancel = c
        }),
    };
    api(requestConfig)
        .then((res: AxiosResponse<apiUserBearerAuthenticationResponseType>) => {
            // トークンが有効
            if (localStorage.getItem("token")) {
                store.dispatch({ type: "setLoginInfo", value: res.data })
            }
        })
}
export const setCalendars = async (year: number, month: number) => {

    if (setCalendarsCancel) {
        setCalendarsCancel()
    }
    let apiParam: apiWorkReadCalendarRequestType = {
        year: year,
        month: month
    }
    const requestConfig: AxiosRequestConfig = {
        url: `/api/work/read/calendar`,
        method: "GET",
        params: apiParam,
        cancelToken: new CancelToken(c => {
            setCalendarsCancel = c
        }),
    };
    await api(requestConfig)
        .then((res: AxiosResponse<apiWorkReadCalendarResponseType>) => {
            store.dispatch({ type: "setCalendars", value: res.data.calendars })
        })
}
export default store;