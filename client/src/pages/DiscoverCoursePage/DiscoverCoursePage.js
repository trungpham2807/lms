import {useState, useEffect} from "react"
import axios from "axios"
import api from "../../redux/api"
import CourseCard from "../../components/cards/CourseCard"
import PaginationBar from "../../components/pagination/Pagination"
import "./DiscoverCoursePage.css"
import SearchForm from "../../components/search/SearchForm"
const DiscoverCoursePage = () => {
    const [pageNum, setPageNum] = useState(1);
    const totalPage = 10;
    const limit = 10;
    const [courses, setCourses] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filterCourses, setFilterCourses] = useState([]);
    const handleSearchChange = (e) => {
      setSearchInput(e.target.value);
    }
    const handleSubmit = (e) => {
      e.preventDefault();
    }

    useEffect(() => {
        const loadCourse = async () => {
            const { data } = await api.get("/course/all-courses");
            setCourses(data);
            setFilterCourses(data)
          };
        loadCourse();
      }, []);
      useEffect(() => {
        const filter = courses.filter(course => course.name.toLowerCase().includes(searchInput.toLocaleLowerCase()))
        setFilterCourses(filter)
      }, [searchInput])
    
      
      
    return (
      <div className="discover-course-page">
            <div className="container mb-5">
              <div className="row justify-content-between">
              <div className="col-4">
                <SearchForm
                searchInput={searchInput}
                handleSubmit={handleSubmit}
                handleSearchChange={handleSearchChange} 
                />
              </div>
              <div className="col-4 my-auto filter-course-length">
                {searchInput ? 
                <>
                Total <span>{filterCourses.length}</span> for "<span className="filter-course-search">{searchInput}</span>" results
                </>
                 : <>
                Total <span>{filterCourses.length}</span> results 
                </>}
                
              </div>
              </div>
             
            </div>
        
            <div className="container">
                <div className="row">
                    {filterCourses?.map((course)=> 
                    <div key={course._id}
                    className="col-md-3 col-sm-4 mb-4">
                    <CourseCard course={course} />
                    </div>)}
                </div>
                <hr />
              <PaginationBar
                pageNum={pageNum}
                setPageNum={setPageNum}
                totalPageNum={totalPage}
              />
            </div>
         
        </div>
            
    )
}

export default DiscoverCoursePage;