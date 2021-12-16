import { useEffect } from "react";
import { SyncOutlined } from "@ant-design/icons";
import UserRoute from "../../../components/routes/UserRoute";
import {Link, useNavigate, useParams} from "react-router-dom"
import axios from "axios";
import api from "../../redux/api"
const StripeSuccessPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id } = params;

  useEffect(() => {
    if (id) successRequest();
  }, [id]);

  console.log(id);

  const successRequest = async () => {
    const { data } = await api.get(`/stripe-success/${id}`);
    // console.log("SUCCESS REQ DATA", data);
    navigate(`/user/course/${data.course.slug}`);
  };

  return (
    <UserRoute showNav={false}>
      <div className="row text-center">
        <div className="col-md-9 pb-5">
          <div className="d-flex justify-content-center p-5">
            <SyncOutlined spin className="display-1 text-danger p-5" />
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </UserRoute>
  );
};

export default StripeSuccessPage;
