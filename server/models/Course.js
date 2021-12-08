const mongoose = require("mongoose");
const {Schema} = mongoose;

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
        category: String,
        published: {
            type: Boolean,
            default: false
        },
        paid: {type: Boolean, default: false},
        // instructor: {type: ObjectId, ref: "User", required: true}
       }, 
       {
        timestamps: true,
    }
)
const Course = mongoose.model("Course", courseSchema)
module.exports = Course;