import {useState, useEffect} from "react"
import axios from "axios"
import api from "../../redux/api"
import CourseCard from "../../components/cards/CourseCard"
import PaginationBar from "../../components/pagination/Pagination"
const DiscoverCoursePage = () => {
    const [pageNum, setPageNum] = useState(1);
    const totalPage = 10;
    const limit = 10;
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const loadCourse = async () => {
            const { data } = await api.get("/course/all-courses");
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
            <hr />
          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPage}
          />
        </div>
    )
}

export default DiscoverCoursePage;