import React from 'react'
import {Menu} from "antd"
import {Link} from "react-router-dom"
import "./NavBar.css"
import {
    AppstoreOutlined,
    LoginOutlined,
    UserAddOutlined,
  } from "@ant-design/icons";

  const {Item} = Menu;
const NavBar = () => {

    return (
        <Menu className="nav-bar">
            <Item className="nav-item" icon={<AppstoreOutlined/>}>
                <Link to="/">
                    <a>Home</a>
                </Link>
            </Item>
            <Item className="nav-item" icon={<LoginOutlined/>}>
                <Link to="/login">
                    <a>Login</a>
                </Link>
            </Item>
            <Item className="nav-item" icon={<UserAddOutlined/>}>
                <Link to="/register">
                    <a>Register</a>
                </Link>
            </Item>
        </Menu>

    )
}

export default NavBar
