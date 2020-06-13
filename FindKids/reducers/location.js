import { location} from "../constants";
var InitialState = [];

const Reducer = (state = InitialState, action) => {
   
    switch (action.type) {
        case location.location_current:
            state=action.location.location;
            return state;
        default: return state;
    }
}

export default Reducer;