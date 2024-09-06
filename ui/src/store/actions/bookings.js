import { types } from '../constants';

export const getUserBookingList = (userid) => {
    return {
        type: types.GET_CUSTOMER_BOOKING_LIST,
        payload: userid
    }
}