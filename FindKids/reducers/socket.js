import { api } from "../constants";
import io from 'socket.io-client';

var socket= io(api.LOCALHOST,{ jsonp: false, 'forceNew': true });
const InitialState = socket ? socket : { }
const Reducer = (state = InitialState, action) => {
    switch (action.type) {
        default: return state;
    }
}

export default Reducer;