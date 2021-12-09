import * as types from "../constants/auth.constant"
const isAuthenticated = !!localStorage.getItem("accessToken")

const initialState = {
    user: null,
    loading: false,
    isAuthenticated: false,
    accessToken: localStorage.getItem("accessToken")
}
const authReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type){
        // Register
        case types.REGISTER_REQUEST:
            return{...state, loading: true}
        case types.REGISTER_SUCCESS:
            return{...state, loading: false}
        case types.REGISTER_FAIL:
            return{...state, loading: false}
        // Login
        case types.LOGIN_REQUEST:
            return{...state, loading:true}
        case types.LOGIN_SUCCESS:
            localStorage.setItem("accessToken", payload.accessToken)
            return{...state, loading: false, user: payload.user, isAuthenticated: true, accessToken: payload.accessToken}
        case types.LOGIN_FAIL:
            return{...state, loading: false, isAuthenticated: false}
            // Logout
        case types.LOGOUT:
            return{...state, loading: false, user: null, accessToken: null, isAuthenticated: false}
        default: 
        return state;
    }

    }
export default authReducer;