import React from 'react'
import {useContext, useState} from "react"
import axios from "axios"
import {Context} from "../../context/index"
import {Button} from "antd"
import {SettingOutlined, UserSwitchOutlined, LoadingOutlined} from "@ant-design/icons"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
const BecomeIntructor = () => {
    const navigate = useNavigate();
    // state
    const [loading, setLoading] = useState(false);
    const {state : {user}, dispatch} = useContext(Context)


    // become instructor
    const becomeInstructor = () => {
        setLoading(true)
        axios.post("http://localhost:8000/api/instructor/become-instructor")
        .then(res=>{
            window.location.href = res.data;
        })
        .catch(err => {
            console.log(err)
            toast("Set payment failed")
            setLoading(true)
        })
    }
    return (
        <div>
            <h1 className="jumbotron text-center square">Become Instructor</h1>
            <div className="container">
                <div className="col-md-6 offset-md-3 text-center">
                    <div className="pt-4">
                        <UserSwitchOutlined className="display-1 pb-3" />
                    <br />
                    <h2>Setup payout to publish courses on Trung LMS</h2>
                    <p className="lead text-warning">stripe account</p>
                    <Button className="mb-3" type="primary" block shape="round"
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

export default BecomeIntructor
