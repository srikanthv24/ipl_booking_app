import { types } from '../constants';
import { User } from '../../services/api';
import { takeLatest, put, call } from 'redux-saga/effects';

function* userLogin(action) {
    const response = yield call(User.userLogin, action.payload);
    if (response && response.error) {
        yield put({
            type: types.USER_LOGIN_FAILURE,
            payload: response.description
        });
    } else {
        yield put({
            type: types.USER_LOGIN_SUCCESS,
            payload: response.data
        });
    }
}

function* userRegister(action) {
    const response = yield call(User.userRegister, action.payload);
    if (response && response.error) {
        yield put({
            type: types.USER_REGISTER_FAILURE,
            payload: response.description
        });
    } else {
        yield put({
            type: types.USER_REGISTER_SUCCESS,
            payload: response.data
        });
    }
}

export function* userSaga() {
    yield takeLatest(types.USER_LOGIN, userLogin)
    yield takeLatest(types.USER_REGISTER, userRegister)
}