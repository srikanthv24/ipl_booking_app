import { types } from '../constants';

export const saveUserPollOpinion = (data) => {
    return {
        type: types.SAVE_USER_POLL_OPINION,
        payload: data
    }
}

export const getPollResults = (data) => {
    return {
        type: types.GET_POLL_RESULTS,
        payload: data
    }
}

export const clearPollState = () => {
    return {
        type: types.CLEAR_POLL_STATE
    }
}