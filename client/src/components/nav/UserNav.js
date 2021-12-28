import {Link} from "react-router-dom"
import "./InstructorNav.css"
const UserNav = () => {
    return (
        <div className="nav flex-column nav-pills mt-2">
            <Link to="/user">
                <button className="btn button-home button-nav">Dashboard</button>
            </Link>
        </div>
    )
}

export default UserNav