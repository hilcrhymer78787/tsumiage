import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Button,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Dialog,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@mui/material';
import CreateUser from "@/components/CreateUser";
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
        <Card>
            <CardHeader title="マイページ" />
            <CardContent>
                <ListItem sx={{ p: 0 }}>
                    <ListItemAvatar>
                        <Avatar
                            src={loginInfo.user_img}
                            sx={{
                                height: '70px',
                                width: '70px',
                                mr: '15px',
                                border: '2px solid #1976d2'
                            }}
                        ></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={loginInfo.name}
                        secondary={loginInfo.email}
                    />
                </ListItem>
            </CardContent>
            <CardActions>
                <Button
                    onClick={logout}
                    color="inherit"
                    variant="contained">ログアウト
                </Button>
                <Button
                    onClick={() => { setCreateUserDialog(true); }}
                    color="primary"
                    variant="contained">編集
                </Button>
            </CardActions>
            <Dialog open={createUserDialog} onClose={() => { setCreateUserDialog(false); }}>
                {createUserDialog &&
                    <CreateUser loginInfo={loginInfo} onCloseMyself={() => { setCreateUserDialog(false); }} />
                }
            </Dialog>
        </Card>
    );
}
export default connect(mapStateToProps)(Mypage);
