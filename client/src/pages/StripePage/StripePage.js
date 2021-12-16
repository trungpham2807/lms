import { useContext, useEffect } from "react";
import { Context } from "../../context";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux"
import api from "../../redux/api"
import {authActions} from "../../redux/actions/auth.action"
const StripePage = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  useEffect(() => {
    dispatch(authActions.getCurrentUser())
  }, []);

  useEffect(() => {
    if (user) {
      api.post("/get-account-status").then((res) => {
        // console.log(res);
        // dispatch(authActions.loginRequest())
        // window.localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href = "/instructor";
      });
    }
  }, [user]);

  return (
      <>
      </>
    // <SyncOutlined
    //   spin
    //   className="d-flex justify-content-center display-1 text-danger p-5"
    // />
  );
};

export default StripePage;
