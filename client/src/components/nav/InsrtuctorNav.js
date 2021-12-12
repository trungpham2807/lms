import { useState, useEffect } from "react";
import {Link} from "react-router-dom"

const InstructorNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills">
      <Link to="/instructor">
        {/* <a className={`nav-link ${current === "/instructor" && "active"}`}> */}
          Dashboard
        {/* </a> */}
      </Link>
      <Link className={`nav-link ${
            current === "/instructor/course/create" && "active"
          }`}to="/instructor/course/create">

          Course Create

      </Link>
    </div>
  );
};

export default InstructorNav;
