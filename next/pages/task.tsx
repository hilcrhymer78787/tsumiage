import React, { useState, useEffect } from 'react';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import Button from '@material-ui/core/Button';
import { api } from '../plugins/axios';
import TextField from '@material-ui/core/TextField';
import { apiTaskReadResponseType } from '../types/api/task/read/response'
import { apiTaskCreateRequestType } from '../types/api/task/create/request'

function Test() {
    const [keyword, setKeyword] = useState("東京" as string)
    const keywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }
    const taskCreate = () => {

    }
    const taskRead = () => {
        const today = new Date();
        const params = {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate() - 3
        }
        const requestConfig: AxiosRequestConfig = {
            url: `/api/task/read`,
            method: "GET",
            params: params
        };
        api(requestConfig)
            .then((res: AxiosResponse<apiTaskReadResponseType>) => {
            })
            .catch((err: AxiosError) => {
            })
    }
    useEffect(() => {
        taskRead()
    }, [])
    
    return (
        <>
            <TextField value={keyword} onChange={keywordChange} id="outlined-basic" variant="outlined" color="primary" />
            <Button onClick={taskCreate} variant="contained" color="primary">追加</Button>
        </>
    )
}
export default Test;