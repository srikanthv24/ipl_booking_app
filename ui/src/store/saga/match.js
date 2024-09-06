import { types } from '../constants';
import { Match } from '../../services/api';
import { takeLatest, put, call } from 'redux-saga/effects';

function* matchList() {
    const response = yield call(Match.getMatchList);
    if (response) {
        if (response.error) {
            yield put({
                type: types.GET_MATCH_LIST_FAILURE,
                payload: response.description
            });
        } else {
            yield put({
                type: types.GET_MATCH_LIST_SUCCESS,
                payload: response.data
            });
        }
    }
}

function* matchDetails(action) {
    const response = yield call(Match.getMatchDetails, action.payload)
    if (response) {
        if (response.error) {
            yield put({
                type: types.GET_MATCH_DETAILS_FAILURE,
                payload: response.description
            })
        } else {
            yield put({
                type: types.GET_MATCH_DETAILS_SUCCESS,
                payload: response.data
            })
        }
    }
}

function* createBooking(action) {
    const response = yield call(Match.createBooking, action.payload)
    if (response) {
        if (response.error) {
            yield put({
                type: types.CREATE_BOOKING_FAILURE,
                payload: response.description
            })
        } else {
            yield put({
                type: types.CREATE_BOOKING_SUCCESS,
                payload: response.data
            })
        }
    }
}

export function* matchSaga() {
    yield takeLatest(types.GET_MATCH_LIST, matchList)
    yield takeLatest(types.GET_MATCH_DETAILS, matchDetails)
    yield takeLatest(types.CREATE_BOOKING, createBooking)
}