import { takeLatest, put } from 'redux-saga/effects';
import {SIGN_IN, SIGN_IN_FAILED, SIGN_IN_SUCCESS} from "../actions";
import ServicesApi from "../../networking/api/ServicesApi";

export function* watchSignIn() {
    yield takeLatest(SIGN_IN, signIn);
}

function* signIn(info) {
    try {
        let result = yield ServicesApi.SignIn(info);
        if (!result) {
            yield put(callFailed(result));
            return;
        }
        // Call success
        yield put(callSuccess(result));
    } catch (e) {
        console.log(e);
    }
}

const callSuccess = (data) => ({
   type: SIGN_IN_SUCCESS,
   data,
});

const callFailed = (data) => ({
    type: SIGN_IN_FAILED,
    data,
});