import { apiAxios } from "../constants";
import io from 'socket.io-client';

var socket= io(apiAxios.LOCALHOST,{ jsonp: false, 'forceNew': true });
const InitialState = socket ? socket : { }
const Reducer = (state = InitialState, action) => {
    switch (action.type) {
        default: return state;
    }
}

export default Reducer;