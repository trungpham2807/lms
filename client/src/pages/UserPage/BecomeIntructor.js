import React from 'react'
import {useState, useEffect} from "react"
import axios from "axios"
// import {Context} from "../../context/index"
import {Button} from "antd"
import {SettingOutlined, UserSwitchOutlined, LoadingOutlined} from "@ant-design/icons"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import api from "../../redux/api"
import {authActions} from "../../redux/actions/auth.action"
import "../HomePage/HomePage.css"
const BecomeInstructor = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {user} = useSelector(state => state.auth)
    useEffect(() => {
      dispatch(authActions.getCurrentUser())
    }, []);
    // state
    const [loading, setLoading] = useState(false);

    // become instructor
    // const becomeInstructor = () => {
    //     setLoading(true)
    //     api.post("/instructor/become-instructor")
    //     .then(res=>{
    //         window.location.href = res.data;
    //         console.log("resss", res)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         toast("Set payment failed")
    //         setLoading(true)
    //     })
    // }
    const becomeInstructor = async () => {
        try{
            const {data} = await api.post("/instructor/become-instructor")
            toast("success redirect to payment gateway")
            window.location.href = data;
        }catch(err){
            console.log(err)
            toast("stripe failed. try again")
        }
      
    }
    return (
        <div>
            <h1 className="jumbotron text-center square">Become Instructor</h1>
            <div className="container">
                <div className="col-md-6 offset-md-3 text-center">
                    <div className="pt-4">
                        <UserSwitchOutlined className="display-1 pb-3" />
                    <br />
                    <h2>Setup payout to publish courses on Trung Academy</h2>
                    <p className="lead text-warning">stripe account</p>
                    <Button className="mb-3 button-home"  block shape="round"
                     icon={loading ? <LoadingOutlined /> : <SettingOutlined/>}
                     size="large"
                     onClick={becomeInstructor}
                     disabled={
                        // user && user.role && user.role.includes("Instructor")|| 
                        loading}>
                    {loading ? "Processing..." : "Payout Setup"}
                    </Button>
                    <p className="lead"> Will be redirected to payment page</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default BecomeInstructor
