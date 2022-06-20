import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cryptoReducer } from "./reducers/cryptoReducer";
import { userReducer } from "./reducers/userReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const rootReducer = combineReducers({
    cryptoModule: cryptoReducer,
    userModule: userReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

window.myStore = store