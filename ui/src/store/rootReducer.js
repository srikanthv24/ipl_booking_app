import { combineReducers } from 'redux';
import {
    user,
    poll,
    match,
    booking,
    reminder
} from './reducers';

const rootReducer = combineReducers({
    user: user,
    poll: poll,
    match: match,
    booking: booking,
    reminder: reminder
})

export default rootReducer;