import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {authActions} from "../../redux/actions/auth.action"
const HomePage = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    console.log("userrrrr", user)
    useEffect(() => {
        dispatch(authActions.getCurrentUser())
      }, []);
    return (
        <div>
        <h1 className="jumbotron text-center bg-primary square">Home Page</h1>
        </div>
    )
}

export default HomePage
