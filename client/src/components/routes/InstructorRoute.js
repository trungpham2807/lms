import { useEffect, useState } from "react";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";
import UserNav from "../nav/UserNav";
import {useNavigate} from "react-router-dom"
import api from "../../redux/api"
import {authActions} from "../../redux/actions/auth.action"
import {useDispatch, useSelector} from "react-redux"
import InstructorNav from "../nav/InsrtuctorNav";

const InstructorRoute = ({children}) => {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  useEffect(() => {
     dispatch(authActions.getCurrentUser())
  }, []);

    return (
        <div>
            <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <InstructorNav />
            </div>
            <div className="col-md-10">{children}</div>
          </div>
        </div>
        </div>
    )
}

export default InstructorRoute
