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
    SmileOutlined,
    CarryOutOutlined,
  } from "@ant-design/icons";
 import api from "../redux/api"
import {authActions} from "../redux/actions/auth.action"
import {useDispatch, useSelector} from "react-redux"
import {useState, useEffect} from "react"
// import {Context} from "../context/index"
const {Item, SubMenu, ItemGroup} = Menu;
const NavBar = () => {
    // redux state
const dispatch = useDispatch()
const {user} = useSelector(state => state.auth)

const navigate = useNavigate();

// global state
// const {state : {user}, dispatch} = useContext(Context)
// active navbar

    const [current, setCurrent] = useState("");
    useEffect(() => {
        process.browser && setCurrent(window.location.pathname)
        // console.log(window.location.pathname)
    }, [process.browser && window.location.pathname])

    // handle logout
    const handleLogout = async () => {
        dispatch(authActions.logout())
        // dispatch({type: "LOGOUT"});
        // window.localStorage.removeItem("user");
        // const {data} = await axios.get("http://localhost:8000/api/auth/logout")
        toast("success logout");
        // redirect
        navigate("/login")

    }
    return (
        <Menu className="nav-bar" selectedKeys = {[current]}>
        {/* <Item key="/user/become-instructor" 
       onClick={(e) => setCurrent(e.key)}
       className="nav-item" icon={<TeamOutlined/>}>
           <Link to="/user/become-instructor">
               Become Instructor
           </Link>
       </Item> */}

       <Item key="/" 
       onClick={(e) => setCurrent(e.key)}
       className="nav-item" icon={<AppstoreOutlined/>}>
           <Link to="/">
               Home
           </Link>
       </Item>
       {/* if user = subscriber -> nav: become instructor. If instructor -> create course */}
   {user && user.role && user.role.includes("instructor") ? (
       <Item key="/instructor/course/create" 
       onClick={(e) => setCurrent(e.key)}
       className="nav-item" icon={<CarryOutOutlined/>}>
       <Link to="/instructor/course/create">
           Create Course
       </Link>
   </Item>
   ) : (
       <Item key="/user/become-instructor" 
           onClick={(e) => setCurrent(e.key)}
           className="nav-item" icon={<TeamOutlined/>}>
           <Link to="/user/become-instructor">
               Become Instructor
           </Link>
       </Item>
   )}
       {/* if user null -> show only login and register link */}
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
           <SubMenu icon = {<SmileOutlined/>} 
           // title={user && user.user.name}
            className="float-right">
               <ItemGroup>
                          {/* if instructor login */}

                   {user.role.includes("instructor") ? 
                   (<Item key="/instructor">
                   <Link to="/instructor">
                       Dashboard
                   </Link>
               </Item>) : 
                   (
                    <Item key="/user">
                    <Link to="/user">
                        Dashboard
                    </Link>
                </Item>
                   )}          
                   <Item  
                       onClick={handleLogout}
                       icon={<LogoutOutlined/>}>  
                       Logout
                   </Item>
               </ItemGroup>
           </SubMenu>     
           </>
       )}

       
   </Menu>

)
}
export default NavBar
