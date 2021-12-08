/* instructor create course */
import {useState, useEffect} from "react"
import axios from "axios"
import  Resizer from "react-image-file-resizer"
import CourseCreateForm from "../../../components/forms/CourseCreateForm"
import {toast} from "react-toastify"
const CourseCreate = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '6.99',
        uploading: false,
        paid: true,
        loading: false,
        category: "",
    })
    const [image, setImage] = useState('')
    const [preview, setPreview] = useState('')
    const [uploadButton, setUploadButton] = useState('Upload Image')
    // using different name properties instead of write every single on change -> [] dynamic
    const handleChange = (e) => {
        
        setValues({...values, [e.target.name]: e.target.value})
    }
    // handle image upload
    const handleImage = (e) => {
        // each time call createObjURL -> new obj URL created
        // preview image
        setPreview(window.URL.createObjectURL(e.target.files[0]))
        // resize images
        let file = e.target.files[0];
        setUploadButton(file.name);
        setValues({...values, loading: true})
        Resizer.imageFileResizer(
            file,
            720,
            500,
            "JPEG",
            100,
            0,
            async (uri) => {
                try{
                    let {data} = await axios.post("/api/course/upload-image", {
                        image: uri,
                        // set image in state
                    })
                    setImage(data)
                    setValues({...values, loading: false})

                }catch(err){
                    setValues({...values, loading: false})
                    // modify/ transform data written/read
                    toast.error("Image upload failed. Try again.")
                }
            }

        )

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
            preview={preview}
            uploadButton = {uploadButton}
            setUploadButton={setUploadButton}
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
            <pre>image: {JSON.stringify(preview, null, 4)} </pre>
        </div>
        </>
    )
}
export default CourseCreate;