import React from 'react';
import Navigation from "@/components/Navigation";
import Header from "@/components/common/Header";
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
