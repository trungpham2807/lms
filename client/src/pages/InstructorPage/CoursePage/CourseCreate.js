/* instructor create course */
import {useState, useEffect} from "react"
import axios from "axios"

import CourseCreateForm from "../../../components/forms/CourseCreateForm"
const CourseCreate = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '6.99',
        uploading: false,
        paid: true,
        loading: false,
        category: "",
        imagePreview: ''
    })
    // using different name properties instead of write every single on change -> [] dynamic
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    const handleImage = () => {

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values)
    }

    return (
        <>
        <h1 className="jumbotron text-center square"> Create Course</h1>
        <div className="pt-3 pb-3">
            <CourseCreateForm 
            handleSubmit={handleSubmit}
            handleImage={handleImage}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
        </div>
        </>
    )
}
export default CourseCreate;