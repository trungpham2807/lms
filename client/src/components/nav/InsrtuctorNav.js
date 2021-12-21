import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import "../../pages/HomePage/HomePage.css"
import "./InstructorNav.css"
const InstructorNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills">
      <Link to="/instructor">
        <button className="btn button-home button-nav"style={{width: "120px"}}>Dashboard</button>    
      </Link>
      <Link className={`nav-link ${
            current === "/instructor/course/create" && "active"
          }`}to="/instructor/course/create">

          <button className="btn button-home button-nav" style={{width: "120px"}}>Create Course</button>    

      </Link>
    </div>
  );
};

export default InstructorNav;
