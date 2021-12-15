import React from 'react'
import {List, Avatar} from "antd"
const {Item} = List;
const SingleCourseLesson = (
    lessons,
    setPreview,
    showModal, 
    setShowModal
) => {
    console.log("lessons", lessons.lessons.length)
    return (
        <div className="container">
      <div className="row">
        <div className="col lesson-list">
          {lessons && <h4>{lessons.lessons.length} Lessons</h4>}
          <hr />
          <List
            itemLayout="horizontal"
            dataSource={lessons.lessons}
            renderItem={(item, index) => (
              <Item>
                <Item.Meta
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                />
                {
                item.video && 
                // item.video !== null &&
                 item.free_preview && (
                  <span
                    className="text-primary pointer"
                    onClick={() => {
                        setPreview(item.video.Location);
                        setShowModal(!showModal);
                      }}
                  >
                    Preview
                  </span>
                )}
              </Item>
            )}
          />
        </div>
      </div>
    </div>
    )
}

export default SingleCourseLesson
