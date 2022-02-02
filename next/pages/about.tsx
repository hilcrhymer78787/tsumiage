import { connect } from "react-redux";
import Button from '@material-ui/core/Button';

const mapStateToProps = (state) => {
    return {
        count: state.count,
        post: state.post
    };
};

function About({ dispatch, count, post }) {
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
        </div>
    );
}

export default connect(mapStateToProps)(About);