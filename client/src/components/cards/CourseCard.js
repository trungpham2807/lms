import React from 'react'
import {Link} from "react-router-dom"
import {Card, Badge} from "antd"
import {currencyFormatter} from "../../utils/helper"
import beau from "../../images/beau.jpg"
import moment from "moment"
import "./CourseCard.css"
const CourseCard = ({course}) => {
    const {name, instructor, price, image, slug, paid, category, createdAt} = course;
    return (
        <>
            <Link to={`/course/` + slug}>
                <div className="course-card-wrapper">
                    <div className="course-card-image course-card-header">
                        <img width="100%" src={image?.Location} alt={name}/>
                    </div>
                    <div className="course-card-body">
                        <div className="course-card-image course-card-instructor">
                            <img width="100%" src="https://st.quantrimang.com/photos/image/2020/08/10/Hinh-nen-cu-shin-4.png" alt="instructor"/>
                        </div>
                        <div className="course-card-text">
                            <h5>{name}</h5>
                            <div>
                                <p>{instructor.name}</p>
                                {/* <small>Created At: {moment({createdAt}).format("MMM YY")}</small> */}
                                <h5 style={{color: "#000"}}>
                                    {paid
                                ? currencyFormatter({
                                    amount: price,
                                    currency: "usd"
                                }): "Free"
                                }
                                </h5>
                            </div>
                            
                        </div>
                        <div className="course-card-category">
                        <Badge
                            count={category}
                            style={{backgroundColor: "#FABB51", color: "#000"}}
                            className="pb-2 mr-2"
                            />
                        </div>
                    </div>
                    
                </div>
                {/* <Card
                className="mb-4 course-card"
                cover={
                    <img
                    // src={"https://miro.medium.com/max/3622/1*RoXcbaF9lIqwpMjiXg54Vw.png"}
                    src={image?.Location}
                    alt={name}
                    style={{ height: "300px", objectFit: "cover"}}
                    className="p-1"/>
                }
                ={
                    <img
                    src={"https://st.quantrimang.com/photos/image/2020/08/10/Hinh-nen-cu-shin-4.png"}
                    alt={name}
                    />
                   
                }
                >

                    <h2 className="font-weight-bold">
                        {name}
                    </h2>
                    <p>
                        by {instructor.name}
                    </p>
                    <Badge
                    count={category}
                    style={{backgroundColor: "#03a9f4"}}
                    className="pb-2 mr-2"
                    />
                <h4 className="pt-2">
                    {paid
                    ? currencyFormatter({
                        amount: price,
                        currency: "usd"
                    }): "Free"
                }
                </h4>
                </Card> */}
            </Link>
        </>
    )
}

export default CourseCard
