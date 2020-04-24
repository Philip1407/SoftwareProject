import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './../reducers/index'
import thunk from 'redux-thunk'
const composeEnhancers = compose;

const configStore = () => {
    const middleware = [thunk];
    const enhancers = [
        applyMiddleware(...middleware)
    ]
    const srote = createStore(rootReducer, composeEnhancers(...enhancers));
    return srote;
};

export default configStore;