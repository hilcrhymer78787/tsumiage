import { connect } from "react-redux";
import Layout from '@/layouts/default';
import Test from '@/components/Test';
const mapStateToProps = (state: any) => {
    return {
        loginInfo: state.loginInfo,
    };
};
TestPage.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    );
};
function TestPage({ loginInfo }) {
    return (
        <div>
            <Test />
            <pre>{JSON.stringify(loginInfo.name, null, 2)}</pre>
        </div>
    );
}

export default connect(mapStateToProps)(TestPage);