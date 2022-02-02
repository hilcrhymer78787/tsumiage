import { connect } from "react-redux";
import Button from '@material-ui/core/Button';

const mapStateToProps = (state:any) => {
    return {
        loginInfo: state.loginInfo,
        count: state.count,
        post: state.post
    };
};

function About({ dispatch, count, post,loginInfo }) {
    return (
        <div>
            <hr className="my-4" />

            <p>Count: {count}</p>
            <Button onClick={() => { dispatch({ type: "setCount", value: count + 1 }) }} variant="contained" color="primary">Up</Button>
            <Button onClick={() => { dispatch({ type: "setCount", value: count - 1 }) }} variant="contained" color="secondary">Down</Button>

            <hr className="my-4" />

            <p>post: {post}</p>
            <Button onClick={() => { dispatch({ type: "setPost", value: post + 1 }) }} variant="contained" color="primary">Up</Button>
            <Button onClick={() => { dispatch({ type: "setPost", value: post - 1 }) }} variant="contained" color="secondary">Down</Button>

            <hr className="my-4" />
            <pre>{JSON.stringify(loginInfo, null, 2)}</pre>
        </div>
    );
}

export default connect(mapStateToProps)(About);