import React from 'react'
import axios from "axios"
import {Menu} from "antd"
import {Link} from "react-router-dom"
import "./NavBar.css"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
import {
    AppstoreOutlined,
    LoginOutlined,
    UserAddOutlined,
    TeamOutlined,
    LogoutOutlined,
    SmileOutlined
  } from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux"
import {useState, useContext, useEffect} from "react"
import {Context} from "../context/index"
const {Item, SubMenu} = Menu;
const NavBar = () => {

const navigate = useNavigate();
// global state
const {state, dispatch} = useContext(Context)
const {user} = state;
// active navbar
    const [current, setCurrent] = useState("");
    useEffect(() => {
        process.browser && setCurrent(window.location.pathname)
        console.log(window.location.pathname)
    }, [process.browser && window.location.pathname])

    const handleLogout = async () => {
        dispatch({type: "LOGOUT"});
        window.localStorage.removeItem("user");
        const {data} = await axios.get("http://localhost/api/auth/logout")
        toast("success logout");
        // redirect
        navigate("/login")

    }
    return (
        <Menu className="nav-bar" selectedKeys = {[current]}>
             <Item key="/user/become-instructor" 
            onClick={(e) => setCurrent(e.key)}
            className="nav-item" icon={<TeamOutlined/>}>
                <Link to="/user/become-instructor">
                    Become Instructor
                </Link>
            </Item>

            <Item key="/" 
            onClick={(e) => setCurrent(e.key)}
            className="nav-item" icon={<AppstoreOutlined/>}>
                <Link to="/">
                    Home
                </Link>
            </Item>
  
            {/* if user null -> show login and register link */}
            {user === null && (
                <>
          <Item key="/login" 
                onClick={(e) => setCurrent(e.key)}
                className="nav-item" icon={<LoginOutlined/>}>
                <Link to="/login">
                    Login
                </Link>
            </Item>
            <Item key="/register" 
                onClick={(e) => setCurrent(e.key)}
                className="nav-item" icon={<UserAddOutlined/>}>
                <Link to="/register">
                    Register
                </Link>
            </Item>
                </>
            )}
            {/* if user already login -> show submenu dashboard with: Logout, login, register */}
            {user !== null && (
                <>
                <SubMenu icon = {<SmileOutlined/>} title={user && user.user.name} className="float-right">
                    <Item  
                    onClick={handleLogout}
                    icon={<LogoutOutlined/>}>  
                        Logout
                    </Item>

                </SubMenu>     
                </>
            )}
            
        </Menu>

    )
}

export default NavBar
