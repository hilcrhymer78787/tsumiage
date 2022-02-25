import { useRouter } from "next/router";
import { Button, CircularProgress, TextField } from '@mui/material';
import Router from 'next/router';
import { connect } from "react-redux";
import Layout from '@/layouts/default';
import FriendList from '@/components/friend/FriendList'
const mapStateToProps = (state: any) => {
    return {
        loginInfo: state.loginInfo,
    };
};
FriendId.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    );
};
function FriendId({ dispatch, count, post, loginInfo }) {
    return (
        <div>
            <div>
                <Button onClick={() => {
                    console.log(Router)
                }}>test</Button>
                {Router.router.query.id}
            </div>
            {/* <pre>{JSON.stringify(loginInfo, null, 2)}</pre> */}
        </div>
    );
}

export default connect(mapStateToProps)(FriendId);