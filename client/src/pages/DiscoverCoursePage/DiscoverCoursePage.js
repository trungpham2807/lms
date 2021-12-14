import {useState, useEffect} from "react"
import axios from "axios"
import api from "../../redux/api"
import CourseCard from "../../components/cards/CourseCard"
const DiscoverCoursePage = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const loadCourse = async () => {
            const { data } = await axios.get("http://localhost:8000/api/course/all-courses");
            setCourses(data);
          };
        loadCourse();
      }, []);
    
      

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    {courses?.map((course)=> 
                    <div key={course._id}
                    className="col-md-4">
                    <CourseCard course={course} />
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default DiscoverCoursePage;