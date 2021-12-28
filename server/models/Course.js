const mongoose = require("mongoose");
// const User = require("./User")
const {Schema} = mongoose;
// const {ObjectId} = Schema;
const lessonSchema = new Schema(
    {
        title: {
            type: String, 
            trim: true,
            required: true
        },
        slug: {
            type: String,
            lowercase: true,
        },
        content: {
            type: {},
        },
        video: {},
        free_preview: {type: Boolean, default: false}
    }, {
        timestamps: true,
    }
)

const courseSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        slug: {
            type: String,
            lowercase: true,
        },
        description: {type: {}, required: true},
        price: {type: Number, default: 6.99},
        image: {}, 
        category: {type: String, enum: ["Coding", "Business", "Art", "Personal Development", "Marketing"]},
        published: {
            type: Boolean,
            default: false
        },
        paid: {type: Boolean, default: false},
        instructor: {type: Schema.Types.ObjectId, ref: "User", 
        // required: true
    },
        lessons: [lessonSchema],
       }, 
       {
        timestamps: true,
    }
)
const Course = mongoose.model("Course", courseSchema)
module.exports = Course;