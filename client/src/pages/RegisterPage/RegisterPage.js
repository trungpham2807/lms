/* This Register page
manage render with useState
*/
import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {toast} from "react-toastify"
import CircleLoader from "react-spinners/CircleLoader";
import {Link, useNavigate} from "react-router-dom"
// import {Context} from "../../context/index"
import api from "../../redux/api"
import "../HomePage/HomePage.css"
// require('dotenv').config()
// const abc = process.env.PUBLIC_API;
// console.log("abc", abc)
const RegisterPage = () => {
  let navigate = useNavigate();
  // global state
  // const {
  //   state: { user },
  // } = useContext(Context);


  // protected route render homepage when run register page only log in (whenever user change -> run)
  // useEffect(() => {
  //   if(user !== null)
  //   navigate("/")
  // }, [user])
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // handle loading spinner
  const [loading, setLoading] = useState(false);
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const {data} = await api.post(`/auth/register`, { 
        name, email, password
      })
      toast.success("Register successfully")
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
    }catch(err){
      toast.error("Register error")
      setLoading(false)
    }
   
  }
  return (
    <>
    <h1 className="jumbotron text-center bg-primary square">Register Page</h1>
    {/*column 12 grid -> md-4: center, padding: 5 */}
    <div className="container col-md-4 offset-md-4 pb-5">
      <form onSubmit={handleSubmit}>
        {/* whenever user type sth input-> grab value -> populate */}
        <input type="text" className="form-control mb-4 p-4" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder ="Enter name"
        required />
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
        disabled = {!name || !email || !password || loading}>
          {/* Set loading spinner */}
          {loading ? <CircleLoader /> : "Submit" }</button>
      </form>
      <p className="text-center p-3">
        Already registered?
        <Link to="/login">
          Login
        </Link>
      </p>

    </div>
    </>
  )
}
export default RegisterPage
