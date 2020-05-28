import { location} from "../constants";
var InitialState = [];

const Reducer = (state = InitialState, action) => {
   
    switch (action.type) {
        case location.location_current:
            console.log("list",state)
            console.log("llllllllllll",action.location)
            state.push(action.location);
            return [...state];
        default: return [...state];
    }
}

export default Reducer;