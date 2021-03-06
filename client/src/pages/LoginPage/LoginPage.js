/* This Register page
manage render with useState
*/
import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {toast} from "react-toastify"
import CircleLoader from "react-spinners/CircleLoader";
import {Link} from "react-router-dom"
// import {Context} from "../../context/index"
import { useNavigate } from "react-router-dom";
import api from "../../redux/api"
import "../HomePage/HomePage.css"
import "./LoginPage.css"

// require('dotenv').config()
// const abc = process.env.PUBLIC_API;
import {useDispatch} from "react-redux"
import {authActions} from "../../redux/actions/auth.action"
const LoginPage = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin1@");
  const [loading, setLoading] = useState(false);
  // internal state
// state
// const {
//   state: { user },
//   dispatch,
// } = useContext(Context);


// useEffect(() => {
//   if (user !== null){navigate("/")};
// }, [user]);
const dispatch = useDispatch()
const handleSubmit = async (e) => {
  e.preventDefault();
  dispatch(authActions.loginRequest(email, password))
  dispatch(authActions.getCurrentUser())
  navigate("/user");
  // console.table({ name, email, password });
  // try {
  //   setLoading(true);
  //   const { data } = await api.post(`http://localhost:8000/api/auth/login`, {
  //     email,
  //     password,
  //   });
  //   axios.defaults.headers.common['authorization'] = data.token;

  //   console.log("dataaaaaaaaaaaa", data)
  //   // console.log("LOGIN RESPONSE", data);
  //   dispatch({
  //     type: "LOGIN",
  //     payload: data,
  //   });
  //   // save in local storage
  //   window.localStorage.setItem("token", data.token);
  //   // window.localStorage.setItem("user", data.user);

  //   // redirect user if login success
  //   navigate("/user");
  //   // setLoading(false);
  // } catch (err) {
  //   toast(err.response.data);
  //   setLoading(false);
  // }
};
  return (
    <div className="login-page">
    <h1 className="jumbotron text-center bg-primary square">Login Page</h1>
    {/*column 12 grid -> md-4: center, padding: 5 */}
    <div className="container col-md-4 offset-md-4 pb-5">
      <form onSubmit={handleSubmit}>
        {/* whenever user type sth input-> grab value -> populate */}
        <input type="text" className="form-control mb-4 p-4"
         value={email} 
         onChange={(e) => setEmail(e.target.value)}
         placeholder ="Enter email"
         required/>
        <input type="password" className="form-control mb-4 p-4" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        required />
        <br />
        <button type="submit" className="btn btn-block button-home"
        disabled = {!email || !password || loading}>
          {/* Set loading spinner */}
          {loading ? <CircleLoader /> : "Submit" }</button>
      </form>
      <p className="text-center p-3">
        Not have account?
        <Link to="/register">
          Register
        </Link>
      </p>

    </div>
    </div>
  )
}
export default LoginPage
