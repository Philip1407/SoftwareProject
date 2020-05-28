import {combineReducers} from 'redux'
import User from './User'
import socket from './socket'
import album from './albumRecord'
import locationcurrent from './location'
const rootReducer= combineReducers({
    User,
    socket,
    album,
    locationcurrent,
});

export default rootReducer;