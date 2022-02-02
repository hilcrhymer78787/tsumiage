import React, { useState, useEffect } from 'react';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { CardActionArea, IconButton, Dialog, ListItem, ListItemAvatar, ListItemText, Avatar, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { api } from '../plugins/axios';
import { apiTaskReadResponseType } from '../types/api/task/read/response'
import { apiTaskReadResponseTaskType } from '../types/api/task/read/response'
import CreateTask from '../components/task/CreateTask'
import Layout from '../layouts/default'
import { Button, TextField } from '@material-ui/core';
import { orange } from "@material-ui/core/colors";
export default function Mypage() {
    useEffect(() => {
    }, [])
    return (
        <div className='card'>
            <div className="card_header">
                <span className="card_header_ttl">新規ユーザー登録</span>
            </div>
            <div className="card_body">
            </div>
            <div className="card_footer justify-space-between">
                <Button
                    onClick={() => { }}
                    variant="contained">ログイン画面へ</Button>
                <Button color="primary"
                    // onClick={createUser}
                    variant="contained"
                    // endIcon={createUserLoading ? <CircularProgress size={25} /> : <SendIcon />}
                    // disabled={createUserLoading}
                >編集</Button>
            </div>
        </div>
    )
}