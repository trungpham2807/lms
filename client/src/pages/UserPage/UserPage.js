import {useEffect, useState} from "react"
import UserRoute from "../../components/routes/UserRoute"
import {useDispatch, useSelector} from "react-redux"
import {Avatar} from "antd"
import {Link} from "react-router-dom"
import {SyncOutlined, PlayCircleOutlined} from "@ant-design/icons"
import api from "../../redux/api"
import {authActions} from "../../redux/actions/auth.action"
const UserPage = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(authActions.getCurrentUser())
      }, []);
    const [courses, setCourses] = useState([])
    useEffect(()=> {
        loadCourses()
    }, [])
    const loadCourses = async () => {
        const {data} = await api.get('/course/user-courses')
        setCourses(data)
    }
    console.log("abac", courses)
    return (
        <UserRoute>
            <h1 className="jumbotron text-center square">User Dashboard</h1>
            <pre>{JSON.stringify(courses,null,4)}</pre>
            {/* show list of courses */}
            {courses&& courses.map(course => (
                <div key={course._id} className="media pt-2 pb-1">
                    <Avatar
                    size={80}
                    shape="square"
                    src={course.image ? course.image.Location : "/coursee.png"}
                    />
                </div>
            ))}
        </UserRoute>
    )
}

export default UserPage;