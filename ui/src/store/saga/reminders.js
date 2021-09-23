import { types } from '../constants';
import { Reminder } from '../../services/api';
import { takeLatest, put, call } from 'redux-saga/effects';

function* createReminder(action) {
    const response = yield call(Reminder.createReminder, action.payload);
    if (response) {
        if (response.error) {
            yield put({
                type: types.CREATE_REMINDER_FAILURE,
                payload: response.description
            });
        } else {
            yield put({
                type: types.CREATE_REMINDER_SUCCESS,
                payload: response.data
            });
        }
    }
}

function* getReminders(action) {
    const response = yield call(Reminder.getReminders, action.payload);
    if (response) {
        if (response.error) {
            yield put({
                type: types.GET_REMINDER_LIST_FAILURE,
                payload: response.description
            });
        } else {
            yield put({
                type: types.GET_REMINDER_LIST_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* reminderSaga() {
    yield takeLatest(types.GET_REMINDER_LIST, getReminders)
    yield takeLatest(types.CREATE_REMINDER, createReminder)
}