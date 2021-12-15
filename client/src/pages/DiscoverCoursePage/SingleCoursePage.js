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
import ReactPlayer from "react-player"
import SingleCourseLesson from "../../components/cards/SingleCourseLesson"
const SingleCoursePage = () => {
    const [course, setCourse] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const {slug} = params;
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
      console.log("course", course)

    const handlePaidEnrollment = () => {
        console.log("handle paid enrollment")
    }
    const handleFreeEnrollment = () => {
        console.log("handle free enrollment")
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
