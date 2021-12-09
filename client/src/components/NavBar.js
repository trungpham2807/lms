import React from 'react'
import {Menu} from "antd"
import {Link} from "react-router-dom"
import "./NavBar.css"
import {
    AppstoreOutlined,
    LoginOutlined,
    UserAddOutlined,
    TeamOutlined,
  } from "@ant-design/icons";

import {useState, useEffect} from "react"
const {Item} = Menu;
const NavBar = () => {
// active navbar
    const [current, setCurrent] = useState("");
    useEffect(() => {
        process.browser && setCurrent(window.location.pathname)
        console.log(window.location.pathname)
    }, [process.browser && window.location.pathname])
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
        </Menu>

    )
}

export default NavBar
