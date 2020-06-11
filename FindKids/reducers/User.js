import { action } from "../constants";
import {GET_USER} from '../constants/action'

let InitialState = {};

const Reducer = (state = InitialState, action) => {
    switch (action.type) {
        case GET_USER:
            {
                console.log(action.type)
                return {...state, user: action.user, jwt: action.jwt}
            }
        default: return state
    }
}

export default Reducer;