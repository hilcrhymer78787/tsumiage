import { createStore } from "redux";
import Router from 'next/router'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { api } from '@/plugins/axios';
import axios from 'axios'
import { apiUserBearerAuthenticationResponseType } from "@/types/api/user/bearerAuthentication/response"
import { apiWorkReadCalendarResponseType } from '@/types/api/work/read/calendar/response'
import { apiWorkReadCalendarRequestType } from '@/types/api/work/read/calendar/request'
const CancelToken = axios.CancelToken;
let setCalendarDataCancel: any = null;
let setLoginInfoByTokenCancel: any = null;

const initialState = {
    loginInfo: null,
    calendarData: {
        calendars:[],
        analytics:{},
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setLoginInfo':
            return { ...state, loginInfo: action.value, };
        case 'setCalendarData':
            return { ...state, calendarData: action.value, };
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
export const setCalendarData = async (year: number, month: number) => {

    if (setCalendarDataCancel) {
        setCalendarDataCancel()
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
            setCalendarDataCancel = c
        }),
    };
    await api(requestConfig)
        .then((res: AxiosResponse<apiWorkReadCalendarResponseType>) => {
            store.dispatch({ type: "setCalendarData", value: res.data })
        })
}
export default store;