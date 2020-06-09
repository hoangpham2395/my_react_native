import {combineReducers} from 'redux';
import signInReducer from "./signInReducer";

const reducers = combineReducers({
    signInReducer,
});

export default reducers;