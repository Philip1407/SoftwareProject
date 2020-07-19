import {combineReducers} from 'redux'
import User from './User'
import socket from './socket'
import album from './albumRecord'
import locationcurrent from './location'
import listdangerous from './dangerous'
const rootReducer= combineReducers({
    User,
    socket,
    album,
    locationcurrent,
    listdangerous
});

export default rootReducer;