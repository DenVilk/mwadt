import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";


const token = localStorage.getItem("token");
const user = token ? jwt_decode(token) : null;
// console.log(jwt_decode(token))

const initialState = token ? {
    isAuthorized: true,
    token: token,
    user: user,
} : {
    isAuthorized: false,
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authorize(state, action) {
            state.isAuthorized = true;
            state.token = action.payload.token;
            state.user = jwt_decode(state.token)
        },
        logout(state) {
            state.isAuthorized = false;
            state.token = null;
            state.user = null;
        }
    }
})

const { actions, reducer } = authSlice;

export const { authorize, logout } = actions;
export default reducer;
