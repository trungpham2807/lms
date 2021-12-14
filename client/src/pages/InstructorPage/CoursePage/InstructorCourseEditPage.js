/* instructor create course */
import {useState, useEffect} from "react"
import axios from "axios"
import  Resizer from "react-image-file-resizer"
import CourseCreateForm from "../../../components/forms/CourseCreateForm"
import {toast} from "react-toastify"
import { useNavigate, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {authActions} from "../../../redux/actions/auth.action"
import InstructorRoute from "../../../components/routes/InstructorRoute"
const InstructorCourseEditPage = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    console.log("userrrrr", user)
    useEffect(() => {
        dispatch(authActions.getCurrentUser())
      }, []);
    let navigate = useNavigate();    
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '6.99',
        uploading: false,
        paid: true,
        loading: false,
        category: "",
    })
    const [image, setImage] = useState({})
    const [preview, setPreview] = useState('')
    const [uploadButton, setUploadButton] = useState('Upload Image')
    // using different name properties instead of write every single on change -> [] dynamic
    
    const params = useParams();
    const {slug} = params;
    useEffect(() => {
        loadCourse()
    }, [])
    const loadCourse = async () => {
        const {data} = await axios.get(`http://localhost:8000/api/course/${slug}`)
        setValues(data)
    }
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
                    let {data} = await axios.post("http://localhost:8000/api/course/upload-image", {
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
    // remove image
    const handleImageRemove = async (e) => {
        e.preventDefault();
        try{
            setValues({...values, loading: true})
            const res = await axios.post('http://localhost:8000/api/course/remove-image', {image})
            setImage({})
            setPreview('')
            setUploadButton('Upload image')
            setValues({...values, loading: false})
            toast.success("Remove success")
        }catch(err){
            setValues({...values, loading: false})
            toast.error("Image remove failed. Try again")
        }
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.put(`http://localhost:8000/api/course/${slug}`, {
                ...values,
                image,
            })
            toast.success("Course updated")
        }catch(err){
            toast(err)
        }
    }

    return (
        <InstructorRoute>
        <h1 className="jumbotron text-center square"> Edit Course</h1>
        {/* {JSON.stringify(values)} */}
        <div className="pt-3 pb-3">
            <CourseCreateForm 
            handleSubmit={handleSubmit}
            handleImage={handleImage}
            handleImageRemove={handleImageRemove}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            preview={preview}
            uploadButton = {uploadButton}
            setUploadButton={setUploadButton}
            editPage={true}
            />
            {/* <pre>{JSON.stringify(values, null, 4)}</pre>
            <pre>image: {JSON.stringify(image, null, 4)} </pre> */}
        </div>
        </InstructorRoute>
    )
}
export default InstructorCourseEditPage;