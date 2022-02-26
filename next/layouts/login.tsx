import React from 'react';
import { connect } from "react-redux";
import Container from '@mui/material/Container';
const mapStateToProps = (state: any) => {
    return {
        loginInfo: state.loginInfo,
    };
};
function LoginLayout({ children, loginInfo }) {
    return (
        <>
            {loginInfo === false && <>
                <Container sx={{ p: '70px 10px' }} maxWidth="xs">
                    {children}
                </Container>
            </>}
        </>
    )
}
export default connect(mapStateToProps)(LoginLayout);
