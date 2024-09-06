import { types } from '../constants';

const intialState = {
    loading: false,
    success: false,
    matches: [],
    matchData: {},
    ticketsBooked: false,
    error: '',
}

export const match = (state = intialState, action) => {
    switch (action.type) {
        case types.GET_MATCH_LIST:
            return {
                ...state,
                loading: true,
                success: false,
                searchresults: [],
                error: ''
            }
        case types.GET_MATCH_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                matches: action.payload,
                error: ''
            }
        case types.GET_MATCH_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                matches: [],
                error: action.payload
            }
        case types.GET_MATCH_DETAILS:
            return {
                loading: true,
                success: false,
                error: '',
                matchData: {}
            }
        case types.GET_MATCH_DETAILS_SUCCESS:
            return {
                loading: false,
                success: true,
                error: '',
                matchData: action.payload
            }
        case types.GET_MATCH_DETAILS_FAILURE:
            return {
                loading: false,
                success: false,
                error: action.payload,
                matchData: {}
            }
        case types.CREATE_BOOKING:
            return {
                loading: true,
                error: '',
                ticketsBooked: false
            }
        case types.CREATE_BOOKING_SUCCESS:
            return {
                loading: false,
                ticketsBooked: true,
                error: '',
            }
        case types.CREATE_BOOKING_FAILURE:
            return {
                loading: false,
                ticketsBooked: false,
                error: action.payload,
            }
        case types.CLEAR_MATCH_STATE:
            return {
                loading: false,
                error: '',
                ticketsBooked: false,
                success: false,
                matchData: {},
                matches: []
            }
        default:
            return state;
    }
}