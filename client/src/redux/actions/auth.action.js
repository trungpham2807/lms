import * as types from "../constants/auth.constant"
import axios from "axios"
import {toast} from "react-toastify"
import api from "../api"
const authActions = {};
authActions.register = ({name, email, password}) => async (dispatch) => {
    dispatch({type: types.POST_REGISTER_REQUEST, payload: null})
    try{
        dispatch({type: types.POST_REGISTER_REQUEST})
        const res = await axios.post("http://localhost:8000/api/auth/register", {name, email, password})
        toast.success("Register success")
        dispatch({type: types.POST_REGISTER_SUCCESS, payload: res.data});
    }catch(err){
        toast.error(err.response.data)
        dispatch({type: types.POST_REGISTER_FAIL})
    }
}

// authActions.getCurrentUser = (accessToken) => async(dispatch) => {
//     dispatch({type: types.GET_CURRENT_USER_REQUEST, payload: null});
//     if(accessToken){
//         const bearerToken = "Bearer " + accessToken;
//         api.defaults.headers.common["authorization"] = bearerToken;
//     }

// }
authActions.loginRequest = (email, password) => async (dispatch) => {
    dispatch({type: types.LOGIN_REQUEST, payload: null});
    try{
        const res = await api.post("/auth/login", {email, password})
        dispatch({types: types.LOGIN_SUCCESS, payload: res.data.data})
        toast.success(`Welcome`)
        api.defaults.headers.common["authorization"] = "Bearer " + res.data.data.accessToken;
        localStorage.setItem("accessToken", res.data.data.accessToken)
    }catch(err){
        dispatch({type: types.LOGIN_FAILURE})
    }
}

export default authActions;