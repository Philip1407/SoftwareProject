import { apiAxios } from "../constants";
const InitialState = {};

const Reducer = (state = InitialState, action) => {
    switch (action.type) {
        case apiAxios.GET_USER:
            state =action.data.data;
            return state;
        default: return state;
    }
}

export default Reducer;