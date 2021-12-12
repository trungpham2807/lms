import {Link} from "react-router-dom"

const UserNav = () => {
    return (
        <div className="nav flex-column nav-pills mt-2">
            <Link to="/user">
                <div className="nav-link active">Dashboard</div>
            </Link>
        </div>
    )
}

export default UserNav