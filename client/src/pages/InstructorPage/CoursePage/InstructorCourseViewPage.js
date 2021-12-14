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
import { UploadOutlined, CheckCircleOutlined, CloseCircleOutlined, EditOutlined, CheckOutlined  } from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux"
import {authActions} from "../../../redux/actions/auth.action"
import remarkGfm from 'remark-gfm'
import Item from 'antd/lib/list/Item'

const InstructorCourseViewPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(authActions.getCurrentUser())
      }, []);
    //   console.log("userrrrr", user)



    const [course, setCourse] = useState([]);
    console.log(" lesson course instructor view page", course.lessons)
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
        const {data} = await api.post(`http://localhost:8000/api/course/lesson/${slug}/${course.instructor._id}`, values)
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
 
const params = useParams();
  const { slug } = params;

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await api.get(`http://localhost:8000/api/course/${slug}`);
    console.log("dadadada", data)
    setCourse(data);
  };

  return (
    <InstructorRoute>
      <div className="container-fluid pt-3">
        {course && (
          <div className="container-fluid pt-1">
            <div className="media pt-2">
              <Avatar
                size={80}
                src={course.image ? course.image.Location : "https://i.pinimg.com/originals/71/72/80/717280e6100325a98ebbe9cd47e0fb5d.jpg"}
              />

              <div className="media-body pl-2">
                <div className="row">
                  <div className="col">
                    <h5 className="mt-2 text-primary">{course.name}</h5>
                    <p style={{ marginTop: "-10px" }}>
                      {course.lessons && course.lessons.length} Lessons
                    </p>
                    <p style={{ marginTop: "-15px", fontSize: "10px" }}>
                      {course.category}
                    </p>
                  </div>

                  <div className="d-flex pt-4">
                    <Tooltip title="Edit">
                      <EditOutlined 
                      onClick={() => navigate(`/instructor/course/edit/${slug}`)}
                      className="h5 pointer text-warning mr-4" />
                    </Tooltip>
                    <Tooltip title="Publish">
                      <CheckOutlined className="h5 pointer text-danger" />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
            <hr />
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
                className="col-md-6 offset-md-3 text-center"
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
              <div className="col lesson-list">
                <h4>
                  {course && course.lessons && course.lessons.length} Lessons
                </h4>
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
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default InstructorCourseViewPage

