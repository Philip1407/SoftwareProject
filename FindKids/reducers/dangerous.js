import { action as type} from "../constants";
var InitialState = [];

const Reducer = (state = InitialState, action) => {
   
    switch (action.type) {
        case type.GET_DANGEROUS:
            state=action.listDanger;
            return state;
        default: return state;
    }
}

export default Reducer;