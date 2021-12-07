import * as types from "../constants/auth.constant"
const initialState = {
    user: null,
    loading: false,
    isAuthenticated: false
}
const authReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type){
        case types.POST_REGISTER_REQUEST:
            return{...state, loading: true}
        case types.POST_REGISTER_SUCCESS:
            return{...state, loading: false}
        case types.POST_REGISTER_FAIL:
            return{...state, loading: false}
        default: 
        return state;
    }

    }
export default authReducer;