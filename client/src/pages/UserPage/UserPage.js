import {useEffect, useState} from "react"
import UserRoute from "../../components/routes/UserRoute"
import {useDispatch, useSelector} from "react-redux"
import {Avatar} from "antd"
import {Link, useParams, useNavigate} from "react-router-dom"
import {SyncOutlined, PlayCircleOutlined} from "@ant-design/icons"
import api from "../../redux/api"
import {authActions} from "../../redux/actions/auth.action"
import "../HomePage/HomePage.css"
import "../InstructorPage/Instructor.css"
const UserPage = () => {
    const navigate = useNavigate();
    const params = useParams()
    // const {slug} = params
    const dispatch = useDispatch()
    const [courses, setCourses] = useState([])
    const {user} = useSelector(state => state.auth)
    // console.log("xzzz", user)
    useEffect(() => {
        dispatch(authActions.getCurrentUser())
      }, []);
      const loadCourses = async () => {
        const {data} = await api.get("http://localhost:8000/api/course/user-courses")
        setCourses(data)
    }
     useEffect(()=> {
          loadCourses()
    }, [])
 
    return (
        <UserRoute>
            <h1 className="jumbotron text-center square">User Dashboard</h1>
            {/* <pre>{JSON.stringify(courses,null,4)}</pre> */}
            {/* show list of courses */}
            {courses&& courses.map(course => (
                <div key={course._id} className="media pt-2 pb-1">
                    <div className="row instructor-single-course">
                        <div className="col-3">
                            <Avatar
                            size={80}
                            shape="square"
                            src={course.image ? course.image.Location : "/coursee.png"}
                            />
                        </div>
                        <div className="col-8">
                            {/* <Link to={"/course/" + slug}> */}
                            <h2 className="aa" onClick={() => navigate(`/course/${course.slug}`) }>{course.name}</h2>
                            {/* </Link> */}
                            <button className="btn" style={{fontSize:"12px", backgroundColor:"#3E8E7E"}}>{course.category}</button>
                            <p>{course.description.slice(0,100) + "..."}</p>
                        </div>
                    </div>
                    
                  
                </div>
                
            ))}
        </UserRoute>
    )
}

export default UserPage;