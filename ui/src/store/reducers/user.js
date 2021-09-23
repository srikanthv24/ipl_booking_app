import { types } from '../constants';

const intialState = {
    loading: false,
    loggedin: false,
    user: {},
    registered: false,
    error: '',
    logout: false
}

export const user = (state = intialState, action) => {
    switch (action.type) {
        case types.USER_LOGIN:
            return {
                ...state,
                loading: true,
                loggedin: false,
                user: {},
                error: ''
            }
        case types.USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                loggedin: true,
                user: action.payload,
                error: ''
            }
        case types.USER_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                loggedin: false,
                user: {},
                error: action.payload
            }
        case types.USER_REGISTER:
            return {
                ...state,
                loading: true,
                registered: false,
                error: ''
            }
        case types.USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                registered: true,
                error: ''
            }
        case types.USER_REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                registered: false,
                error: action.payload
            }

        case types.CLEAR_LOGIN_STATE:
            return {
                ...state,
                loading: false,
                error: '',
                logout: false
            }
        case types.CLEAR_REGISTER_STATE:
            return {
                ...state,
                loading: false,
                registered: false,
                error: ''
            }
        case types.HANDLE_LOGOUT:
            return {
                ...state,
                loading: false,
                registered: false,
                error: '',
                loggedin: false,
                user: {},
                logout: true
            }
        default:
            return state;
    }
}