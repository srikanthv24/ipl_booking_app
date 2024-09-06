import { types } from '../constants';

const intialState = {
    loading: false,
    success: false,
    pollRecorded: false,
    pollResults: [],
    error: '',
}

export const poll = (state = intialState, action) => {
    switch (action.type) {
        case types.SAVE_USER_POLL_OPINION:
            return {
                ...state,
                loading: true,
                success: false,
                pollRecorded: false,
                error: ''
            }
        case types.SAVE_USER_POLL_OPINION_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                pollRecorded: true,
                error: ''
            }
        case types.SAVE_USER_POLL_OPINION_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                pollRecorded: false,
                error: action.payload
            }
        case types.GET_POLL_RESULTS:
            return {
                ...state,
                loading: true,
                success: false,
                pollResults: [],
                error: ''
            }
        case types.GET_POLL_RESULTS_SUCCESS:
            return {
                ...state,
                loading: false,
                pollResults: action.payload,
                error: ''
            }
        case types.GET_POLL_RESULTS_FAILURE:
            return {
                ...state,
                loading: false,
                pollResults: [],
                error: action.payload
            }
        case types.CLEAR_POLL_STATE:
            return {
                ...state,
                loading: false,
                pollRecorded: false,
                pollResults: [],
                success: false,
                error: ''
            }
        default:
            return state;
    }
}