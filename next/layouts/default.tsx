import Router from 'next/router'
import React from 'react';
import Navigation from "../components/Navigation";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';

const mapStateToProps = (state: any) => {
    return {
        loginInfo: state.loginInfo,
    };
};
function Layout({ dispatch, children, loginInfo }) {
    const logout = () => {
        localStorage.removeItem("token")
        Router.push("/login")
        dispatch({ type: "setLoginInfo", value: false })
    }
    return (
        <>
            {loginInfo && <>
                <header>
                    <div>{loginInfo.name}</div>
                    <Button onClick={logout} variant="contained" color="primary">ログアウト</Button>
                </header>
                <main>{children}</main>
                <Navigation />
            </>}
        </>
    )
}
export default connect(mapStateToProps)(Layout);
