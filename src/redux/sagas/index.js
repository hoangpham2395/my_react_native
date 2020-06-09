import { all, fork } from 'redux-saga/effects';
import * as watchSignIn from './signInSaga'

export default function* rootSaga() {
    yield all([
        ...Object.values(watchSignIn),
    ].map(fork))
}