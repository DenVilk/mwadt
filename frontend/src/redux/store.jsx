import { combineReducers } from "redux";
import { default as authReducer } from "./slices/auth";
import { configureStore } from "@reduxjs/toolkit";

const allReducers = combineReducers({
    auth: authReducer
})

const store = configureStore({
    reducer: allReducers,
},)

// createStore(
//     combineReducers(reducer), 
//     initialState, 
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )

export default store;