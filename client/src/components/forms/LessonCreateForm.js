import React from 'react'
import {Button} from "antd"
const LessonCreateForm = ({handleCreateLesson, handleVideo,
    values, setValues, 
    uploading, setUpLoading,
    uploadButtonText, setUploadButtonText}) => {
    return (
        <div className="container pt-3">
            <form onSubmit={handleCreateLesson}>
                <input type="text" 
                className="form-control square"
                onChange={(e) => setValues({ ...values, title: e.target.value })}
                value={values.title}
                placeholder="Title"
                autoFocus
                required
                />

                <textarea className="form-control mt-3" cols="7" rows="7" 
                onChange={(e) => setValues({ ...values, content: e.target.value })}
                value={values.content}                
                placeholder="Content">
                </textarea>
                {/* upload video */}
                <div className="form-row">
                    <div className="col">
                        <div className="form-group">
                            <label className="btn btn-outline-secondary btn-block text-left test">
                             {uploadButtonText}                                
                            <input 
                                type="file" 
                                name="video" 
                                size="large"
                                onChange={handleVideo} 
                                accept="video/*" 
                                hidden/>
                            </label>
                        </div>
                    </div>
                </div>
                <Button 
                onClick={handleCreateLesson} 
                className="col mt-6" 
                size="large"
                type="primary"
                loading={uploading}
                shape="round">
                    Create Lesson
                </Button>
            </form>
        </div>
    )
}

export default LessonCreateForm
