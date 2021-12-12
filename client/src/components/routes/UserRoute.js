import { useEffect, useState } from "react";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";
import UserNav from "../nav/UserNav";
import {useNavigate} from "react-router-dom"
const UserRoute = ({ children }) => {
  // state
  const [ok, setOk] = useState(false);
  // router

  const navigate = useNavigate();
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/auth/current-user");
      //   console.log(data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      navigate("/login");
    }
  };

  return (
    <>
      {!ok &&
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
