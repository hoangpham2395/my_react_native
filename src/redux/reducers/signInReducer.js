import {SIGN_IN_FAILED, SIGN_IN_SUCCESS} from "../actions";

const initState = {
    email: '',
    password: '',
};

export default function signInReducer(data = initState, action) {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return {
                request: true,
                status: true,
                data: action.data,
            }
        case SIGN_IN_FAILED:
            return {
                request: true,
                status: false,
                data: action.data,
            }
        default:
            return {
                request: false,
                status: false,
                data: data,
            }
    }
}