import { types } from '../constants';
import { Poll } from '../../services/api';
import { takeLatest, put, call } from 'redux-saga/effects';

function* saveUserOpinion(action) {
    const response = yield call(Poll.saveUserPollOpinion, action.payload);
    if (response) {
        if (response.error) {
            yield put({
                type: types.SAVE_USER_POLL_OPINION_FAILURE,
                payload: response.description
            });
        } else {
            yield put({
                type: types.SAVE_USER_POLL_OPINION_SUCCESS,
                payload: response.data
            });
        }
    }
}

function* getPollResults(action) {
    const response = yield call(Poll.getPollResults, action.payload);
    if (response) {
        if (response.error) {
            yield put({
                type: types.GET_POLL_RESULTS_FAILURE,
                payload: response.description
            });
        } else {
            yield put({
                type: types.GET_POLL_RESULTS_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* pollSaga() {
    yield takeLatest(types.GET_POLL_RESULTS, getPollResults)
    yield takeLatest(types.SAVE_USER_POLL_OPINION, saveUserOpinion)
}