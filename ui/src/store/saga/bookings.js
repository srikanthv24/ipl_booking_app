import { types } from '../constants';
import { Booking } from '../../services/api';
import { takeLatest, put, call } from 'redux-saga/effects';

function* userBookingList(action) {
    const response = yield call(Booking.getCustomerBookingList, action.payload);
    if (response) {
        if (response.error) {
            yield put({
                type: types.GET_CUSTOMER_BOOKING_LIST_FAILURE,
                payload: response.description
            });
        } else {
            yield put({
                type: types.GET_CUSTOMER_BOOKING_LIST_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* bookingSaga() {
    yield takeLatest(types.GET_CUSTOMER_BOOKING_LIST, userBookingList)
}