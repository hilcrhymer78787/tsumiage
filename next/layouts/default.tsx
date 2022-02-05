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
    return (
        <>
            {loginInfo && <>
                <main>
                    <div className="container">
                        {children}
                    </div>
                </main>
                <Navigation />
            </>}
        </>
    )
}
export default connect(mapStateToProps)(Layout);
