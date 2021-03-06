import React from 'react'
import {useState, useEffect} from "react"
import axios from "axios"
import {Link, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {authActions} from "../../redux/actions/auth.action"
import {Badge, Modal, Button} from "antd"
import PreviewModal from '../../components/modal/PreviewModal'
import {currencyFormatter} from "../../utils/helper"
import ReactPlayer from "react-player"
import {FileOutlined, FolderAddOutlined, CodepenOutlined, AliyunOutlined, MobileOutlined, SafetyCertificateOutlined, VideoCameraOutlined, LoadingOutlined, SafetyOutlined, PlayCircleOutlined} from "@ant-design/icons"
import "./SingleCourseCard.css"
const SingleCourseCard = ({course,
    showModal,
    setShowModal,
    preview,
    setPreview,
    loading,
    // user,
    enrolled,
    setEnrolled,
    handlePaidEnrollment,
    handleFreeEnrollment,
  }) => {
    // destructure
    const {
      name,
      description,
      instructor,
      updatedAt,
      lessons,
      image,
      price,
      paid,
      category,
    } = course;
    // console.log("courseeeeee", course)
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(authActions.getCurrentUser())
      }, []);
    return (
      <div className="jumbotron bg-primary square single-course-card mb-5">
        <div className="container single-course-card-container">
          <div className="row">
            <div className="col-md-8">
              {/* title */}
              <h1 className="text-light font-weight-bold">{name}</h1>
              {/* description */}
              <p className="lead">
                {description && description.substring(0, 160)}...
              </p>
              {/* category */}
              <Badge
                count={category}
                style={{ backgroundColor: "#03a9f4" }}
                className="pb-4 mr-2"
              />
              {/* author */}
              {/* <p>Created by {instructor.name}</p> */}
              {/* updated at */}
              <p>Last udpated {new Date(updatedAt).toLocaleDateString()}</p>
              {/* price */}
              <h4 className="text-light">
                {paid
                  ? currencyFormatter({
                      amount: price,
                      currency: "usd",
                    })
                  : "Free"}
              </h4>
            </div>
            <div className="col-md-4">
              {/* {lessons[0].video.Location} */}
            {/* {JSON.stringify(lessons[0])} */}
            {/* show video preview or course image */}
            <div className="single-course-card-wrapper">
              <div
              className="single-course-card-player"
                onClick={() => {
                  setPreview(lessons[0].video.Location);
                  setShowModal(!showModal);
                }}
              >
                {lessons && lessons[0].video?.Location ? (
                <div className="single-course-card-player-video">
                  <ReactPlayer
                    className="react-player-div"
                    url={lessons[0].video.Location}
                  //   light={image.Location}
                    width="100%"
                    height="225px"
                  />
                </div>
                 ) : (
                  <div className="single-course-card-player-video">
                    <img src={image?.Location} alt={name} className="img img-fluid" />
                  </div>
                )}
                <div className="single-course-card-player-button">
                  <PlayCircleOutlined/>
                </div>
              </div>
           
            {/* enroll button */}
            {loading ? (
              <div className="d-flex justify-content-center mt-3">
                <LoadingOutlined className="h1 text-danger" />
              </div>
            ) : (
              <div className="single-course-enroll-button">
                <Button
                  className="mb-3 mt-3"
                  // type="danger"
                  block
                  shape="round"
                  icon={<SafetyOutlined />}
                  size="large"
                  disabled={loading}
                  onClick = {paid ? handlePaidEnrollment : handleFreeEnrollment}
                >
                  {/* if have user then check user already enrolled -> show Go to course */}
                  {/* No user -> required login to enroll */}
                  {user ? enrolled.status? "Go to course"
                  : "Enroll this course"
                    : "Login to enroll"}
                </Button>
              </div>
            )}
            <div className="single-course-enroll-text">
              <VideoCameraOutlined />on-demand video <br/>
              <FileOutlined />articles <br/>
              <FolderAddOutlined />downloadable resources <br/>
              <CodepenOutlined />coding exercise <br/>
              <AliyunOutlined />Full lifetime access <br/>
              <MobileOutlined />Access on mobile and TV <br/>
              <SafetyCertificateOutlined />Certificate of completion <br/>
            </div>
          </div>
          </div>
        </div>
        </div>

      </div>
    );
  };

export default SingleCourseCard
