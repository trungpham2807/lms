import * as types from "../constants/auth.constant";
import api from "../api";
import { toast } from "react-toastify";

const loginRequest = (email, password) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const res = await api.post("http://localhost:8000/api/auth/login", { email, password });
    const name = res.data.user.name;
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
    toast.success(`Welcome ${name} login`);
    api.defaults.headers.common["authorization"] =
      // "Bearer " + res.data.token;
      `Bearer ${res.data.token}`

    localStorage.setItem("token", res.data.token);
  } catch (error) {
    console.log("err", error)
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
  }
};


const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
      const res = await api.post("http://localhost:8000/api/auth/register", { name, email, password });
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data });
    toast.success(`Thank you for your registration, ${name}!`);
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error });
  }
};

const getCurrentUser = (token) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  if (token) {
    const bearerToken = "Bearer " + token;
    api.defaults.headers.common["authorization"] = bearerToken;
  }
  try {
    const res = await api.get("http://localhost:8000/api/auth/current-user");
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};

const logout = () => (dispatch) => {
  delete api.defaults.headers.common["authorization"];
  localStorage.setItem("token", "");
  dispatch({ type: types.LOGOUT, payload: null });
};

export const authActions = {
  loginRequest,
  register,
  getCurrentUser,
  logout,
};