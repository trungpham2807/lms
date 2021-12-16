import { useEffect, useState } from "react";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";
import UserNav from "../nav/UserNav";
import {useNavigate} from "react-router-dom"
import api from "../../redux/api"
import {authActions} from "../../redux/actions/auth.action"
import {useDispatch, useSelector} from "react-redux"

// import {Context} from "../../context/index"

const UserRoute = ({ children }) => {
  const navigate = useNavigate();


//   const {
//   state: { user },
//   dispatch,
// } = useContext(Context);
  // state
  // const [ok, setOk] = useState(false);

  // console.log("user",user)
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  useEffect(() => {
    dispatch(authActions.getCurrentUser())
  }, []);;

  // const fetchUser = async () => {
  //   try {
  //     const { data } = await api.get("http://localhost:8000/api/auth/current-user", 
  //   // {
  //   //   headers: {'authorization': 'Bearer' + ' ' + JSON.parse(localStorage.getItem('token'))}
  //   // }
  //   );
  //   console.log("data", data)
  //   // dispatch()
  //   // navigate("/user");

  //     //   console.log(data);
  //     // if (data.ok) setOk(true);
  //   } catch (err) {
  //     console.log(err);
  //     // setOk(false);
  //   }
  // };

  return (
    <>
      {
      // !ok &&
      // ? (
      //   <SyncOutlined
      //     spin
      //     className="d-flex justify-content-center display-1 text-primary p-5"
      //   />
      // ) : 
      (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <UserNav />
            </div>
            <div className="col-md-10">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserRoute;
