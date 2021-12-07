import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// import 'ant/dist/antd.css'
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
