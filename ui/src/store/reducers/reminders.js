import { types } from '../constants';

const intialState = {
    loading: false,
    reminderCreated: false,
    reminders: [],
    error: '',
}

export const reminder = (state = intialState, action) => {
    switch (action.type) {
        case types.CREATE_REMINDER:
            return {
                ...state,
                loading: true,
                reminderCreated: false,
                error: ''
            }
        case types.CREATE_REMINDER_SUCCESS:
            return {
                ...state,
                loading: false,
                reminderCreated: true,
                error: ''
            }
        case types.CREATE_REMINDER_FAILURE:
            return {
                ...state,
                loading: false,
                reminderCreated: false,
                error: action.payload
            }
        case types.GET_REMINDER_LIST:
            return {
                ...state,
                loading: true,
                reminders: [],
                error: ''
            }
        case types.GET_REMINDER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                reminders: action.payload,
                error: ''
            }
        case types.GET_REMINDER_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                reminders: [],
                error: action.payload
            }
        default:
            return state;
    }
}