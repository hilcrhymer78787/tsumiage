import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import Layout from '../layouts/default'
const mapStateToProps = (state: any) => {
    return {
        loginInfo: state.loginInfo,
        count: state.count,
        post: state.post
    };
};
About.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}
function About({ dispatch, count, post, loginInfo }) {
    return (
        <div>
            <pre>{JSON.stringify(loginInfo, null, 2)}</pre>
        </div>
    );
}

export default connect(mapStateToProps)(About);