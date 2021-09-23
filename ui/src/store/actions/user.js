import { types } from '../constants';

export const userRegister = (data) => {
    return {
        type: types.USER_REGISTER,
        payload: data
    }
}

export const userLogin = (data) => {
    return {
        type: types.USER_LOGIN,
        payload: data
    }
}

export const clearLoginState = () => {
    return {
        type: types.CLEAR_LOGIN_STATE,
    }
}

export const clearRegisterState = () => {
    return {
        type: types.CLEAR_REGISTER_STATE,
    }
}

export const handleLogout = () => {
    return {
        type: types.HANDLE_LOGOUT
    }
}