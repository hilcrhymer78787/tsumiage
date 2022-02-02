import React, { useState, useEffect } from 'react';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { CardHeader, CardActionArea, IconButton, Dialog, ListItem, ListItemAvatar, ListItemText, Avatar, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { api } from '../plugins/axios';
import { apiTaskReadResponseType } from '../types/api/task/read/response'
import { apiTaskReadResponseTaskType } from '../types/api/task/read/response'
import CreateTask from '../components/task/CreateTask'
import Layout from '../layouts/default'
import { Button, TextField } from '@material-ui/core';
import { orange } from "@material-ui/core/colors";
import { connect } from "react-redux";
import Router from 'next/router'
import styles from '../styles/Mypage.module.scss'
Mypage.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}
const mapStateToProps = (state: any) => {
    return {
        loginInfo: state.loginInfo,
        count: state.count,
        post: state.post
    };
};
function Mypage({ dispatch, loginInfo }) {
    const logout = () => {
        localStorage.removeItem("token")
        Router.push("/login")
        dispatch({ type: "setLoginInfo", value: false })
    }
    useEffect(() => {
    }, [])
    return (
        <div id='mypage' className='card'>
            <div className="card_header">
                <span className="card_header_ttl">マイページ</span>
            </div>
            <div className="card_body py-5">
                <div className='myinfo'>
                    <CardHeader
                        className={styles.myinfo}
                        avatar={
                            <Avatar src={loginInfo.user_img}></Avatar>
                        }
                        title={loginInfo.name}
                        subheader={loginInfo.email}
                    />
                </div>
            </div>
            <div className="card_footer justify-space-between">
                <Button
                    onClick={logout}
                    variant="contained">ログアウト</Button>
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
export default connect(mapStateToProps)(Mypage);
