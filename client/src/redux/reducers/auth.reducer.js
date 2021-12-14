import * as types from "../constants/auth.constant";

const isAuthenticated = !!localStorage.getItem("accessToken");
const initialState = {
  loading: false,
  isAuthenticated,
  accessToken: localStorage.getItem("accessToken"),
  user: null,
}

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_REQUEST:
    case types.REGISTER_REQUEST:
    case types.GET_CURRENT_USER_REQUEST:
      return { ...state, loading: true };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload.user,
        isAuthenticated: true,
        accessToken: payload.accessToken,
      };
    case types.LOGIN_FAILURE:
    case types.GET_CURRENT_USER_FAILURE:
      return { ...state, loading: false, isAuthenticated: false, user: { ...state.user, payload } };

    case types.REGISTER_FAILURE:
      return { ...state, loading: false };

    case types.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthenticated: true,
      };

    case types.LOGOUT:
      return {
        ...state,
        user: null,
        loading: false,
        accessToken: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;