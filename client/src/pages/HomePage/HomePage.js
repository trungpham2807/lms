import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {authActions} from "../../redux/actions/auth.action"
import "./HomePage.css"
import image_1 from "../../images/image_1.svg"
import image_2 from "../../images/image_2.svg"
import image_3 from "../../images/image_3.svg"
import image_4 from "../../images/image_4.svg"
import image_5 from "../../images/image_5.svg"
import image_6 from "../../images/image_6.svg"
import button from "../../images/button.svg"
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
        {/* <Slider /> */}
              <img src={image_1} />
              <img src={image_2} />
              <img src={image_3} />
              {/* <img src={image_4} />
              <img src={image_5} />
              <img src={image_6} /> */}
            <div>
                <img src={button} />
            </div>
        </div>
    )
}

export default HomePage
