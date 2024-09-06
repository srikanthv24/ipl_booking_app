import { types } from '../constants';

export const createReminder = (data) => {
    return {
        type: types.CREATE_REMINDER,
        payload: data
    }
}

export const getReminderList = (userid) => {
    return {
        type: types.GET_REMINDER_LIST,
        payload: userid
    }
}