import * as types from "../constants/auth.constant"
import axios from "axios"
import {toast} from "react-toastify"
const authAction = {};
authAction.register = ({name, email, password}) => async (dispatch) => {
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
export default authAction;