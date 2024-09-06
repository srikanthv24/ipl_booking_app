import { types } from '../constants';

const intialState = {
    loading: false,
    bookings: [],
    error: '',
}

export const booking = (state = intialState, action) => {
    switch (action.type) {
        case types.GET_CUSTOMER_BOOKING_LIST:
            return {
                ...state,
                loading: true,
                bookings: [],
                error: ''
            }
        case types.GET_CUSTOMER_BOOKING_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                bookings: action.payload,
                error: ''
            }
        case types.GET_CUSTOMER_BOOKING_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                bookings: [],
                error: action.payload
            }
        default:
            return state;
    }
}