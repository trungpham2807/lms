/* Protected page. Only user login can access this page*/
import React from 'react'
import {useEffect, useState, useContext} from 'react'
import {Context} from "../../context/index"
import axios from "axios"
const UserPage = () => {
    // global state
    const {state} = useContext(Context);
    const {user} = state;
    // internal state: default this page hidden
    const [hidden, setHidden] = useState(true)
    const getUser = async () => {
        try{
            const {data} = await axios.get("http://localhost:8000/api/auth/current-user")
            setHidden(false)
        }catch(err){
            console.log(err)
            setHidden(true)
        }
    }
    useEffect(() => {     
        getUser();
    }, [])
    return (
        <div>
        {!hidden && (
            <h1 className="jumbotron text-center bg-primary square">User Page</h1>
        )}      
        </div>
    )
}

export default UserPage
