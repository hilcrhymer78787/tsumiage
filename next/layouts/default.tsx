import React from 'react';
import Navigation from "@/components/common/Navigation";
import Header from "@/components/common/Header";
import Container from '@mui/material/Container';
import { connect } from "react-redux";

const mapStateToProps = (state: any) => {
    return {
        loginInfo: state.loginInfo,
    };
};
function Layout({ dispatch, children, loginInfo }) {
    return (
        <>
            {loginInfo && <>
                <Header />
                <Container sx={{ p: '70px 10px' }} maxWidth="xs">
                    {children}
                </Container>
                <Navigation />
            </>}
        </>
    )
}
export default connect(mapStateToProps)(Layout);
