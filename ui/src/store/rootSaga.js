import { all } from 'redux-saga/effects';
import {
    userSaga,
    pollSaga,
    matchSaga,
    bookingSaga,
    reminderSaga
} from './saga';

export default function* rootSaga() {
    yield all([
        userSaga(),
        pollSaga(),
        matchSaga(),
        bookingSaga(),
        reminderSaga()
    ])
}