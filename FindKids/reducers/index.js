import {combineReducers} from 'redux'
import User from './User'
import socket from './socket'
import album from './albumRecord'
const rootReducer= combineReducers({
    User,
    socket,
    album,
});

export default rootReducer;