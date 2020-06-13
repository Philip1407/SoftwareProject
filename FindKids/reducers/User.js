// import { action } from "../constants";
import { action as type } from "../constants";

let InitialState = { username: '' };

const Reducer = (state = InitialState, action) => {

    switch (action.type) {
        case type.GET_USER:
            {
                state = {
                    user: action.user,
                    accessToken: action.accessToken
                }
            }
        default: return state
    }
}

export default Reducer;