import React from 'react'
import {useState, useEffect} from "react"
import axios from "axios"
import {Link, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {authActions} from "../../redux/actions/auth.action"
import {Badge} from "antd"
import {currencyFormatter} from "../../utils/helper"
const SingleCoursePage = () => {
    const [course, setCourse] = useState([]);
    const params = useParams();
    const {slug} = params;
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(authActions.getCurrentUser())
      }, []);
    useEffect(() => {
        const loadCourse = async () => {
            const { data } = await axios.get(`http://localhost:8000/api/course/${slug}`);
            setCourse(data);
          };
        loadCourse();
      }, [slug]);
      console.log("course", course)


    // const {name, description, instructor, updateAt, lessons, image, price, paid, category} = courses;
    return (

                <div className="jumbotron bg-primary square">   
                    <div className="row">   
                        <div className="col-md-8">
                            <h1 className="text-light font-weight-bold">
                            {course?.name}
                            </h1>
                            <p className="lead">{course?.description && course?.description.substring(0,160)}...</p>
                        </div>
                        <Badge count={course?.category} style={{backgroundColor:"#03a9f4"}} className="pb-4 mr-2"/>
                        {/* <p>Created by {course?.instructor.name}</p> */}
                        <p>Last update {new Date(course.updatedAt).toLocaleDateString()}</p>
                        <h4 className="text">
                            {course?.paid ? currencyFormatter({amount: course?.price, currency: "usd"}): "Free"}
                        </h4>
                        <div className="col-md-4">
                            <p>show course image</p>
                            <p>show enroll button</p>
                        </div>      
                    </div>  
                </div>
    )
}

export default SingleCoursePage
