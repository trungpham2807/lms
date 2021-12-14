import React from 'react'
import {Button, Progress, Tooltip} from "antd"
import {CloseCircleFilled} from '@ant-design/icons'
const LessonUpdateForm = ({handleCreateLesson, handleVideo, handleVideoRemove,
    values, setValues, 
    uploading, setUpLoading,
    progress,
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
                <div className="form-row ">
                    <div className="col">
                        <div className="form-group" >
                           
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <label className="btn btn-outline-secondary btn-block text-left mt-3 test ">
                        {uploadButtonText}                                
                        <input 
                        type="file" 
                        name="video" 
                        size="large"
                        onChange={handleVideo} 
                        accept="video/*" 
                        hidden
                        />
                    </label>
                    {
                    // !uploading && values.video.Location && 
                    (
                        <Tooltip title="Remove">
                            <span onClick = {handleVideoRemove} className="pt-1 pl-3">
                                <CloseCircleFilled className="text-danger d-flex justify-content-center pt-4 pointer" />
                            </span>
                        </Tooltip>
                    )}
                </div>
                {/* check progress upload video */}
                {progress > 0 && <Progress
                 className="d-flex justify-content-center pt-2"
                  percent={progress}
                  steps={10} />}
                <Button 
                onClick={handleCreateLesson} 
                className="col mt-3" 
                size="large"
                type="primary"
                loading={uploading}
                style={{width: "100%"}}
                shape="round">
                    Create Lesson
                </Button>
            </form>
        </div>
    )
}

export default LessonUpdateForm
