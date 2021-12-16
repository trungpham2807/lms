import React from 'react'
import {Link} from "react-router-dom"
import {Card, Badge} from "antd"
import {currencyFormatter} from "../../utils/helper"
import beau from "../../images/beau.jpg"

const CourseCard = ({course}) => {
    const {name, instructor, price, image, slug, paid, category} = course;
    return (
        <div>
            <Link to={`/course/` + slug}>
                <Card
                className="mb-4"
                cover={
                    <img
                    // src={"https://miro.medium.com/max/3622/1*RoXcbaF9lIqwpMjiXg54Vw.png"}
                    src={image?.Location}
                    alt={name}
                    style={{ height: "300px", objectFit: "cover"}}
                    className="p-1"/>
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
                </Card>
            </Link>
        </div>
    )
}

export default CourseCard
