import {SIGN_IN, SIGN_IN_FAILED, SIGN_IN_SUCCESS} from "./actionTypes";

export function signInAction(info) {
    const {email, password} = info;
    return {
        type: SIGN_IN,
        email,
        password,
    }
}

export function signInSuccessAction(data) {
    return {
        type: SIGN_IN_SUCCESS,
        data,
    }
}

export function signInFailedAction(data) {
    return {
        type: SIGN_IN_FAILED,
        data,
    }
}