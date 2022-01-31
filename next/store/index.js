import { createStore } from "redux";

const initialState = {
    count: 1,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setCount':
            return { count: action.value, };
        default:
            return state;
    }
};



const store = createStore(reducer);
export default store;