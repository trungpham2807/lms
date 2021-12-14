import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import 'antd/dist/antd.css';
import NavBar from "./components/NavBar"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

// test
import CourseCreate from "./pages/InstructorPage/CoursePage/CourseCreate"
import InstructorPage from "./pages/InstructorPage/InstructorPage"
import InstructorCourseViewPage from "./pages/InstructorPage/CoursePage/InstructorCourseViewPage"
import InstructorCourseEditPage from "./pages/InstructorPage/CoursePage/InstructorCourseEditPage"
import UserPage from "./pages/UserPage/UserPage"
import BecomeInstructor from "./pages/UserPage/BecomeIntructor"
import StripePage from "./pages/StripePage/StripePage"

function App() {

  return (
    <div className="App">
      <Router>
        <ToastContainer position = "top-center" />
        <NavBar />
        <Routes>
          <Route path="/" element = {<HomePage />} />
          <Route path="/login" element = {<LoginPage />} />
          <Route path="/register" element = {<RegisterPage />} />
    
          {/* test route */}
          <Route path="/instructor/course/create" element={<CourseCreate/>}  />
          <Route path="/instructor" element={<InstructorPage />} />
          <Route path="/instructor/course/view/:slug" element={<InstructorCourseViewPage />} />
          <Route path="/instructor/course/edit/:slug" element={<InstructorCourseEditPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/become-instructor" element={<BecomeInstructor />} />
          <Route path="instructor/get-account-status" element={<StripePage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
