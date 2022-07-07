import { connect } from "react-redux";
import Layout from "@/layouts/default";
import FriendList from "@/components/friend/FriendList";
const mapStateToProps = (state: any) => {
  return {
    loginInfo: state.loginInfo,
  };
};
Friend.getLayout = function getLayout (page) {
  return (
    <Layout>{page}</Layout>
  );
};
function Friend ({ dispatch, count, post, loginInfo }) {
  return (
    <div>
      <FriendList />
    </div>
  );
}

export default connect(mapStateToProps)(Friend);