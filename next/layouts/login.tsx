import React from 'react';
import { connect } from "react-redux";

const mapStateToProps = (state: any) => {
    return {
        loginInfo: state.loginInfo,
    };
};
function LoginLayout({ children, loginInfo }) {
    return (
        <>
            {loginInfo === false && <>
                <main>
                    <div className="container">
                        {children}
                    </div>
                </main>
            </>}
        </>
    )
}
export default connect(mapStateToProps)(LoginLayout);
