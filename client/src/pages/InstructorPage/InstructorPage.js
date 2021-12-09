import React from 'react'
import {useState, useEffect} from "react"
import axios from "axios"
import {Avatar, Button, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import LessonCreateForm from "../../components/forms/LessonCreateForm"
import {toast} from "react-toastify"
const InstructorPage = () => {
    const [courses, setCourses] = useState([]);
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
            const {data} = await axios.post("http://localhost:8000/api/course/video-upload", videoData, {
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
    const loadCourses = async () => {
        const {data} = await axios.get("http://localhost:8000/api/instructor/instructor-courses")
        console.log(data)
    }
    useEffect(() => {
        loadCourses()
    }, [])

    return (
        <div>
            <h1 className="jumbotron text-center square">Instructor Dashboard</h1>
            {/* {courses && courses.map(course => (
                <>
                <div className="media pt-2">
                    <Avatar size={80} src = {course.image ? course.image.Location : "/course.jpeg"} />
                </div>
                <div className="media-body pl-2">
                    <div className="row">
                        <div classname="col">
                            hello 
                        </div>

                    </div>

                </div>
                </>
            ))} */}
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

              />
            </Modal>
        </div>
    )
}

export default InstructorPage
