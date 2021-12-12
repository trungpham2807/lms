import {useContext} from "react"
import {Context} from "../../context/index"
import UserRoute from "../../components/routes/UserRoute"

const UserPage = () => {
    const {state: {user}} = useContext(Context)
    return (
        <UserRoute>
            <h1 className="jumbotron text-center square">User Dashboard</h1>
        </UserRoute>
    )
}

export default UserPage;