/* This Register page
manage render with useState
*/
import React, {useState} from 'react'
import axios from 'axios'
import {toast} from "react-toastify"
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post(`http://localhost:8000/api/auth/register`, { 
        name, email, password
      })
      toast.success("Register successfully")
    }catch(err){
      toast.error(err.response.data)
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
        <button type="submit" className="btn btn-block btn-primary p-2">Submit</button>
      </form>

    </div>
    </>
  )
}
export default RegisterPage
