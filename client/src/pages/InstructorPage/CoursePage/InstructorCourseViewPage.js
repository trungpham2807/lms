import React from 'react'
import {useState, useEffect} from "react"
import {Link, useNavigate, useParams} from "react-router-dom"
import InstructorRoute from "../../../components/routes/InstructorRoute"
import axios from "axios"
import {Avatar, Button, Modal,Tooltip, List } from 'antd';
import ReactMarkdown from 'react-markdown'
import {toast} from "react-toastify"
import api from "../../../redux/api"
import LessonCreateForm from "../../../components/forms/LessonCreateForm"
import {UserAddOutlined, AlignCenterOutlined, GlobalOutlined, InfoCircleOutlined, EyeInvisibleOutlined, QuestionOutlined, CloseOutlined, UploadOutlined, CheckCircleOutlined, CloseCircleOutlined, EditOutlined, CheckOutlined  } from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux"
import {authActions} from "../../../redux/actions/auth.action"
import remarkGfm from 'remark-gfm'
import Item from 'antd/lib/list/Item'
import moment from "moment"
import "../Instructor.css"
import "../../HomePage/HomePage.css"
import "./InstructorCourseViewPage.css"
// import "../../HomePage/HomePage.css"
const InstructorCourseViewPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    useEffect(() => {
      dispatch(authActions.getCurrentUser())
    }, []);
    //   console.log("userrrrr", user)



    const [course, setCourse] = useState([]);
    // console.log(" lesson course instructor view page", course._id)
    // lesson
    const [visible, setVisible] = useState(false);
    const [values, setValues] = useState({
        title: '',
        content: '',
        video: {},
    })
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    const [uploading, setUploading] = useState(false)
    // Upload Button text
    const [uploadButtonText, setUploadButtonText] = useState("Upload video")
    // check progress uploading video
    const [progress, setProgress] = useState(0)
    // Add Lesson
    const handleCreateLesson = async (e) => {
      try{
        e.preventDefault();
        const {data} = await api.post(`/course/lesson/${slug}/${course.instructor._id}`, values)
        setValues({...values, title: "", content: "", video: {}})
        setProgress(0);
        setUploadButtonText("Upload Video")
        setVisible(false)
        setCourse(data)
        toast("Lesson Added")
      }catch(err){
        console.log(err);
        toast("Add lesson failed")
      }
        
    }
    // handle upload video lesson
    const handleVideo = async (e) => {
        
        try{
            const file = e.target.files[0];
            setUploadButtonText(file.name);
            setUploading(true)
            // send data to backend
            const videoData = new FormData()
            videoData.append('video', file)
            // save progress bar -> send video as form data to backend
            const {data} = await api.post("/course/video-upload", videoData, {
                onUploadProgress: (e) => {
                    setProgress(Math.round(100 * e.loaded) / e.total)
                }
            })
            // once response is received
            console.log(data)
            setValues({...values, video: data})
            setUploading(false)
            toast.success("Lesson upload successfully")

        }catch(err){
            setUploading(false)
            toast.error("Video upload fail")
        }

    }
    // handle remove video
    const handleVideoRemove = async () => {
        try{
            setUploading(true);
            const {data} = await api.post("/course/video-remove", values.video)
            // console.log("dataaaaaaaaa", data)
            setValues({...values, video: {}})
            setUploading(false);
            setProgress(0); 
            setUploadButtonText("Upload Another Video")
        }catch(err){
            console.log(err);
            setUploading(false);
            toast("video remove failed")
        }
    }
 
const params = useParams();
  const { slug } = params;

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await api.get(`/course/${slug}`);
    // console.log("dadadada", data)
    setCourse(data);
  };
// publish course
const handlePublish = async (e, courseId) => {
  try{
    let answer = window.confirm("Do you want to publish your course")
    const {data} = await api.put(`/course/publish/${courseId}`)
    setCourse(data);
    toast("Congrat to publish course!")
  }catch(err){
    toast("Course publish failed")
  }

}
const handleUnPublish = async (e, courseId) => {
  try{
    let answer = window.confirm("course not available")
    const {data} = await api.put(`/course/unpublish/${courseId}`)
    setCourse(data);
    toast("unplish course!")

  }catch(err){
    toast("Course unpublish failed")

  }

}
  return (
    <InstructorRoute>
      <div className="container-fluid pt-3 instructor-single-course">
        {course && (
          <>
          <div className="container-fluid pt-1 instructor-course-view d-flex align-items-end">
            <div className="instructor-view-course-image">
            <img
                  width="100%"
                    src={course.image ? course.image.Location : "https://i.pinimg.com/originals/71/72/80/717280e6100325a98ebbe9cd47e0fb5d.jpg"}
                  />
            <div className="instructor-view-course-sub-image">
            </div>
            </div>
            <div className="row">
              <div className="col-4 instructor-view-course-avatar">
                  <img
                  width="100%"
                    src={course.image ? course.image.Location : "https://i.pinimg.com/originals/71/72/80/717280e6100325a98ebbe9cd47e0fb5d.jpg"}
                  />
               
              </div>
              <div className="col-8 text-align-start">
              <div className="media pt-2" style={{height: "100%"}}>
              

              <div className="media-body pl-2 instructor-view-name" style={{height: "100%"}}>
                <div className="row">
                  <div className="col">
                    <h4 className="mt-2 text-primary" style={{fontWeight: "bold", fontSize:"30px"}}>{course.name}</h4>
                    <span style={{ marginTop: "-10px",marginRight: "10px", fontSize: "15px" }}>
                      {course.lessons && course.lessons.length} Lessons
                    </span>
                     
                    <Button className="button-home instructor-view-course-button">
                      {course.category}
                    </Button>
                    <div className="instructor-view-course-create-name instructor-view-course-sub-icon">
                    <UserAddOutlined/>Created by <span>{course.instructor?.name}</span>
                    </div>
                    <div >
                      
                      <span className="instructor-view-course-sub-icon"><InfoCircleOutlined/>
                      Last updated {moment(course.updatedAt).format("MMM YY")}            
                      </span>
                      <span className="instructor-view-course-sub-icon">
                        <GlobalOutlined/>
                        English</span>
                      <span className="instructor-view-course-sub-icon">
                        <AlignCenterOutlined/>
                        English, VietNamese
                      </span>
                    </div>
                
      
                  </div>

                  <div className="d-flex pt-4 instructor-view-button">
                    <Button className=" instructor-edit-button instructor-edit-button-edit">
                      <Tooltip title="Edit">
                        <EditOutlined 
                        onClick={() => navigate(`/instructor/course/edit/${slug}`)}
                        className="h5 pointer mr-4 instructor-edit-button-icon" />
                         EDIT
                      </Tooltip>
                    </Button>
                   
                    {/* check if lesson < 3 => cant not publish */}
                    {course.lessons && course.lessons.length < 3 ?

                    (
                    <Button className=" instructor-edit-button instructor-edit-button-require">
                      <Tooltip title="Min 3 lessons required to publish">
                        <QuestionOutlined className="h5 pointer instructor-edit-button-icon"/>
                      </Tooltip>
                    </Button>
                    ) 
                    : course.published ? (
                    <Button className=" instructor-edit-button instructor-edit-button-unpublish">
                      <Tooltip title="Unpublish">
                        <EyeInvisibleOutlined
                        onClick={(e) => handleUnPublish(e, course._id)}
                        className="h5 pointer instructor-edit-button-icon" />
                         UNPUBLISH
                      </Tooltip>
                    </Button>
                    
                    ): (
                      <Button className=" instructor-edit-button instructor-edit-button-publish">
                         <Tooltip title="Publish">
                          <CheckOutlined 
                          onClick={(e) => handlePublish(e, course._id)}
                          className="h5 pointer instructor-edit-button-icon" />
                           PUBLISH
                          </Tooltip>
                      </Button>
                     
                    )}
                   
                  </div>
                </div>
              </div>
            </div>
              </div>
            </div>
           
            <hr />

          </div>
          <div className="container-fluid instructor-course-view-description">
            <div className="row">
              <div className="col">
                  <h5>Description</h5>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {course.description}
                  </ReactMarkdown>

              </div>
            </div>
            <div className="row">
              <Button
                onClick={() => setVisible(true)}
                className="col-md-6 offset-md-5 text-center button-home"
                type="primary"
                shape="round"
                icon={<UploadOutlined />}
                size="large"
              >
                Add Lesson
              </Button>
            </div>

            <br />

            <Modal
              title="+ Add Lesson"
              centered
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <LessonCreateForm
                values={values}
                setValues={setValues}
                handleCreateLesson={handleCreateLesson}
                uploading={uploading}
                uploadButtonText={uploadButtonText}
                handleVideo={handleVideo}
                handleVideoRemove={handleVideoRemove}
                progress={progress}
              />
            </Modal>

            {/* Render lesson view for instructor */}
            <div className="row pb-5">
              <div className="col-3">
              </div>
              <div className="col-6 instructor-view-lesson-list">
                
                <h4 style={{fontWeight: 'bold'}}>
                Course content
                </h4>
                <p>
                {course && course.lessons && course.lessons.length} Lessons
                </p>
                <List itemLayout="horizontal" 
                  dataSource={course && course.lessons}
                 renderItem={(item, index) => 
                  <Item>
                    <Item.Meta avatar={<Avatar>{index + 1}</Avatar>}
                    title={item.title}>

                    </Item.Meta>
                  </Item>
                 }>
                </List>
              </div>
              <div className="col-3">
              </div>
            </div>
          </div>
          </>
        )}
      </div>
    </InstructorRoute>
  );
};

export default InstructorCourseViewPage

