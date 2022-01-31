import { connect } from "react-redux";
import Button from '@material-ui/core/Button';

const mapStateToProps = (state) => {
    return {
        count: state.count,
        posts: state.posts
    };
};

function About({ dispatch, count }) {
    return (
        <div>
            <p>Count: {count}</p>
            <Button onClick={() => { dispatch({ type: "setCount", value: count + 1 }) }} variant="contained" color="primary">Up</Button>
            <Button onClick={() => { dispatch({ type: "setCount", value: count - 1 }) }} variant="contained" color="secondary">Down</Button>
        </div>
    );
}

export default connect(mapStateToProps)(About);