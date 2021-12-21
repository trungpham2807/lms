import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {authActions} from "../../redux/actions/auth.action"
import {Button} from "antd"
import {Link} from "react-router-dom"
import "./HomePage.css"
import image_1 from "../../images/image_1.svg"
import image_2 from "../../images/image_2.svg"
import image_3 from "../../images/image_3.svg"
import image_4 from "../../images/image_4.svg"
import image_5 from "../../images/image_5.svg"
import image_6 from "../../images/image_6.svg"
import button from "../../images/button.svg"
import s31 from "../../images/s3.1.jpg"
import s32 from "../../images/s3.2.png"
import s33 from "../../images/s3.3.jpg"
import test from "../../images/test.png"
import {ReactComponent as Background} from "../../images/background.svg"
import bannerImg from "../../images/bannerImg.png"
import Footer from "./Footer"
const HomePage = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(authActions.getCurrentUser())
      }, []);
      
    return (
        <>
        <section id="section-hp-1" className="container mb-5">
            <div className="row">
                <div className="col-6">
                    <img src={bannerImg} width="100%" />
                </div>
                <div className="col-6 home-page-1">
                    <div>
                        <h1>
                        For every student,
                        <br/>
                        every classroom.
                        <br/>
                        Real results.
                        </h1>
                        <p>We’re a nonprofit with the mission to provide a free, 
                        <br/>world-class education for anyone, anywhere.</p>
                    </div>
                    <div>
                        <Link to="/discover-course">
                        <button className="btn btn-primary button-home">
                                Discover courses here
                        </button> 
                        </Link>
    
                    </div>
                           
                </div>
            </div>
        </section>
        
        <section id="section-hp-2">
            <div className="home-page-2">
                <Background />
            </div>
            <div className="container pt-5">
                {/* <a href="#section-hp-2">
                    <button className="btn btn-primary button-home">
                        Go
                    </button> 
                </a> */}
                    <div className="row pt-5 justify-content-center">
                        <div className="col-3">
                            <div className="s3-image">
                                <img src={image_1} />
                            </div>            
                            <h4>Personalized learning</h4>
                            <p>Students practice at their own pace, first filling gaps in their understanding and then accelerating their learning</p>
                        </div>
                        <div className="col-3">
                        <div className="s3-image">
                            <img src={image_2} />
                        </div>
                            <h4>Trusted content</h4>
                            <p>Created by experts.</p>
                        </div>
                        <div className="col-3">
                            <div className="s3-image">
                                <img src={image_3} />
                            </div>
                            <h4>Tools to empower instructors</h4>
                            <p>With Trump Academy, instructor can identify gaps in their student's understanding</p>
                        </div>
                    </div>

 
            </div>
        </section>
        <section id="section-hp-3">
            <div className="home-page-3">
                <div>
                    <Link to="/instructor">
                        <button className="btn btn-primary button-home">
                            Instructor
                        </button>
                    </Link>
                   
                </div>
                <div>
                    <Link to="/user">
                        <button className="btn btn-primary button-home">
                            Student
                        </button>
                    </Link>
                </div>
                <div>
                    <Link to="/user/become-instructor">
                        <button className="btn btn-primary button-home">
                                Become Instructor
                        </button>
                    </Link>   
                </div>
                <div className="s3-background">
                    <img src={test}/>
                </div>
            </div>
    
        </section>
        <Footer />
        </>
    )
}

export default HomePage
