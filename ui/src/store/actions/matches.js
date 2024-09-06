import { types } from '../constants';

export const getMatchList = () => {
    return {
        type: types.GET_MATCH_LIST
    }
}

export const getMatchDetails = (id) => {
    return {
        type: types.GET_MATCH_DETAILS,
        payload: id
    }
}

export const createBooking = (data) => {
    return {
        type: types.CREATE_BOOKING,
        payload: data
    }
}

export const clearMatchState = () => {
    return {
        type:types.CLEAR_MATCH_STATE
    }
}