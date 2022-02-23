import React, { useState, useEffect } from 'react';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { CardHeader, CardActionArea, IconButton, Dialog, ListItem, ListItemAvatar, ListItemText, Avatar, CircularProgress } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';
import { api } from '@/plugins/axios';
import CreateTask from '@/components/task/CreateTask';
import CreateUser from "@/components/CreateUser";
import Layout from '@/layouts/default';
import { Button, TextField } from '@mui/material';
import { orange } from "@mui/material/colors";
import { connect } from "react-redux";
import Router from 'next/router';
const mapStateToProps = (state: any) => {
    return {
        loginInfo: state.loginInfo,
    };
};
function Mypage({ dispatch, loginInfo }) {
    const [createUserDialog, setCreateUserDialog] = useState(false as boolean);
    const logout = () => {
        if (!confirm(`ログアウトしますか？`)) {
            return;
        }
        localStorage.removeItem("token");
        Router.push("/login");
        dispatch({ type: "setLoginInfo", value: false });
    };
    useEffect(() => {
    }, []);
    return (
        <div id='mypage' className='card'>
            <div className="card_header">
                <div className="card_header_left">
                    <h2 className="card_header_left_main">マイページ</h2>
                </div>
            </div>
            <div className="card_body py-5">
                <div className='myinfo'>
                    <CardHeader
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
                    color="inherit"
                    variant="contained">ログアウト</Button>
                <Button color="primary"
                    onClick={() => { setCreateUserDialog(true); }}
                    variant="contained"
                >編集</Button>
            </div>
            <Dialog open={createUserDialog} onClose={() => { setCreateUserDialog(false); }}>
                {createUserDialog &&
                    <CreateUser loginInfo={loginInfo} onCloseMyself={() => { setCreateUserDialog(false); }} />
                }
            </Dialog>
        </div>
    );
}
export default connect(mapStateToProps)(Mypage);
