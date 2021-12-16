import React from 'react'
import {useState, useEffect} from "react"
import axios from "axios"
import {Link, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {authActions} from "../../redux/actions/auth.action"
import {Badge, Modal, Button} from "antd"
import PreviewModal from '../../components/modal/PreviewModal'
import SingleCourseCard from "../../components/cards/SingleCourseCard"
import {currencyFormatter} from "../../utils/helper"
import api from "../../redux/api"
import ReactPlayer from "react-player"
import SingleCourseLesson from "../../components/cards/SingleCourseLesson"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
const SingleCoursePage = () => {
  const navigate = useNavigate();
    const [course, setCourse] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const {slug} = params;
    const [enrolled, setEnrolled] = useState({})
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    useEffect(() => {
      dispatch(authActions.getCurrentUser())
    }, []);
    useEffect(() => {
        const loadCourse = async () => {
            const { data } = await axios.get(`http://localhost:8000/api/course/${slug}`);
            setCourse(data);
          };
        loadCourse();
      }, [slug]);
      // console.log("hi", course)
      // console.log("ha", user)

// check enrollment
useEffect(()=> {
  if(user && course) checkEnrollment();
}, [user, course])
    const checkEnrollment = async () => {
      const {data} = await api.get(`/course/check-enrollment/${course._id}`)
      console.log("dataaaa", data)
      setEnrolled(data)
    }
    const handlePaidEnrollment = () => {
        console.log("handle paid enrollment")
    }
    const handleFreeEnrollment = async (e) => {
      e.preventDefault();
      try{
        // check user is logged in and check if already enrolled
        if(!user) navigate("/login")
        // check if already enrolled
        if(enrolled.status) return navigate(`/user/course/${enrolled.course.slug}`)
        setLoading(true)
        const {data} = await api.post(`/course/free-enrollment/${course._id}`)
        toast(data.message)
        setLoading(false)
        navigate(`/user/course/${data.course.slug}`)
      }catch(err){
        toast("Enrollment failed. Try again")
        setLoading(false)
      }
    }
    // const {name, description, instructor, updateAt, lessons, image, price, paid, category} = courses;
    return (
        <>
        <SingleCourseCard
        course={course}
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
        // user={user}
        loading={loading}
        handlePaidEnrollment={handlePaidEnrollment}
        handleFreeEnrollment={handleFreeEnrollment}
        enrolled={enrolled}
        setEnrolled={setEnrolled}
      />

      <PreviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
      />
      {course.lessons && (
          <SingleCourseLesson
          lessons = {course.lessons}
          setPreview={setPreview}
          showModal={showModal}
          setShowModal={setShowModal}
          />
      )}
        </>
    )
}

export default SingleCoursePage
