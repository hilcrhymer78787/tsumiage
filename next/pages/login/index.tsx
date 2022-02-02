import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import LoginLayout from '../../layouts/login'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { api } from '../../plugins/axios';
import store from "../../store/index";

const mapStateToProps = (state: any) => {
    return {
        loginInfo: state.loginInfo,
        count: state.count,
        post: state.post
    };
};
Login.getLayout = function getLayout(page) {
    return (
        <LoginLayout>{page}</LoginLayout>
    )
}
const testAuthentication = async () => {
    const requestConfig: AxiosRequestConfig = {
        url: `/api/user/test_authentication`,
        method: "GET",
    };
    await api(requestConfig)
        .then((res: AxiosResponse) => {
            localStorage.setItem('token', res.data.token);
            store.dispatch({ type: "setLoginInfo", value: res.data })
        })
}
function Login({ dispatch, count, post, loginInfo }) {
    return (
        <div>
            <Button onClick={testAuthentication} variant="contained" color="primary">ログイン</Button>
            <pre>{JSON.stringify(loginInfo, null, 2)}</pre>
        </div>
    );
}

export default connect(mapStateToProps)(Login);