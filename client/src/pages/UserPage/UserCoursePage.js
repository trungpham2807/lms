import React, { useState, useEffect, createElement } from "react";
import axios from "axios";
// import StudentRoute from "../../../components/routes/StudentRoute";
import { Button, Menu, Avatar } from "antd";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
import {
  PlayCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";
import api from "../../redux/api"
import {useParams, useNavigate} from "react-router-dom"
const { Item } = Menu;

const UserCoursePage = () => {
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });
  const [completedLessons, setCompletedLessons] = useState([]);
  // force state update
  const [updateState, setUpdateState] = useState(false);

  const params = useParams()
const {slug} = params;

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);


  const loadCourse = async () => {
    const { data } = await api.get(`course/user/course/${slug}`);
    setCourse(data);
  };


  return (
    // <StudentRoute>
    <div className="row">
        <div className="col-2">
        <div style={{ maWidth: 320 }}>
      <Button
        onClick={() => setCollapsed(!collapsed)}
        className="text-primary mt-1 btn-block mb-2"
      >
        {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}{" "}
        {!collapsed && "Lessons"}
      </Button>
      <Menu
        defaultSelectedKeys={[clicked]}
        inlineCollapsed={collapsed}
        style={{ height: "80vh", overflow: "scroll" }}
      >
        {course.lessons.map((lesson, index) => (
          <Item
            onClick={() => setClicked(index)}
            key={index}
            icon={<Avatar>{index + 1}</Avatar>}
          >
            {lesson.title.substring(0, 30)}
          </Item>
        ))}
      </Menu>
    </div>
        </div>
        <div className="col-9">
                <div className="col">
            {clicked !== -1 ? (
                <>
                {course.lessons[clicked].video &&
                    course.lessons[clicked].video.Location && (
                    <>
                        <div className="wrapper">
                        <ReactPlayer
                            className="player"
                            url={course.lessons[clicked].video.Location}
                            width="100%"
                            height="100%"
                            controls
                        />
                        </div>
                    </>
                    )}

                <ReactMarkdown
                    source={course.lessons[clicked].content}
                    className="single-post"
                />
                </>
            ) : (
                <div className="d-flex justify-content-center p-5">
                <div className="text-center p-5">
                    <PlayCircleOutlined className="text-primary display-1 p-5" />
                    <p className="lead">Click on the lessons to start learning</p>
                </div>
                </div>
            )}
            </div>
        </div>
    


  </div>
    // </StudentRoute>
  );
};

export default UserCoursePage;
