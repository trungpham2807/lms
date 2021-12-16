import React from 'react'
import {useState, useEffect} from "react"
import axios from "axios"
import {Avatar, Button, Modal,Tooltip } from 'antd';
import { UploadOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import LessonCreateForm from "../../components/forms/LessonCreateForm"
import {toast} from "react-toastify"
import InstructorRoute from "../../components/routes/InstructorRoute"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import api from "../../redux/api"
import {authActions} from "../../redux/actions/auth.action"
import "./Instructor.css"
// import {Context} from "../../context/index"
const InstructorPage = () => {
    // const {state : {user}, dispatch} = useContext(Context)
    
    const [courses, setCourses] = useState([]);
    console.log("hhuhuhu", courses)
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
    const handleCreateLesson = (e) => {
        e.preventDefault();
        setValues({...values, title: "", content: "", video: {}})
        setProgress(0);
        setUploadButtonText("Upload Video")
        setVisible(false)
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
            const {data} = await api.post("http://localhost:8000/api/course/video-upload", videoData, {
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
            const {data} = await api.post("http://localhost:8000/api/course/video-remove", values.video)
            console.log("dataaaaaaaaa", data)
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
    const loadCourses = async () => {
        const {data} = await api.get("http://localhost:8000/api/instructor/instructor-courses")
        console.log("data load courses" , data)
        setCourses(data)
    }
    useEffect(() => {
        loadCourses()
    }, [])

    return (
        <InstructorRoute>
        <div>
            <h1 className="jumbotron text-center square">Instructor Dashboard</h1>
            {
            // courses && 
            courses.map(course => (
                <>
                
                <div className="media pt-2 instructor-single-course">
                  <div className="row">
                    <div className="col-3">
                      <Avatar
                      size={200}
                      shape="square"
                      src={course.image ? course.image.Location : "https://i.picsum.photos/id/216/600/400.jpg?hmac=fYb8tMDxwuyEPTKiRbCa4QkhA_e9E0oXv50dK-OLWCM"}
                    />
                    </div>
                    <div className="col-9 instructor-course-1">
                      <div className="media-body pl-2">
                      <div className="row">
                        <div className="col text-left">
                          <Link
                            to={"/instructor/course/view/" + course.slug}
                            className="pointer"
                          >
                            <div className="mt-2 text-primary">
                              <h2 className="pt-2 text-start">{course.name}</h2>
                            </div>
                          </Link>
                          <p>
                            {course.description.slice(0, 100)+"..."}
                          </p>
                          <div style={{ marginTop: "-10px", textAlign:"left" }}>
                          <span style={{marginRight: "1rem", fontWeight: "bold"}}>{course.instructor.name}</span>  
                          <span>{course.lessons.length} Lessons</span>

                          </div>
            
      
                          {course.lessons.length < 2 ? (
                            <div className="instructor-course-live bg-warning">
                              Required more lessons
                            </div>
                          ) : course.published ? (
                            <div className="instructor-course-live bg-success">
                              Published
                            </div>
                          ) : (
                            <div className="instructor-course-live bg-success">
                              Ready publish
                            </div>
                          )}
                        </div>
      
                        <div className="col-md-3 mt-3 text-center">
                          {course.published ? (
                            <Tooltip title="Published">
                              <CheckCircleOutlined className="h5 pointer text-success" />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Unpublished">
                              <CloseCircleOutlined className="h5 pointer text-warning" />
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>  
                  </div>
                  
   
                </div>
              </>
            ))
            }
            {/* note for button lesson -> move to {course} */}
            <div className="row">
                <Button 
                className="col-md-6 offset-md-3 text-center"
                onClick = {() =>  setVisible(true)}
                type="primary"
                shape="round"
                size="large"
                icon={<UploadOutlined/>}
                >
                    Add lesson
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
        </div>
        </InstructorRoute>
    )
}

export default InstructorPage
