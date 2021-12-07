const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema(
    {
        name: { 
            type: String, 
            // remove additional whitespace: " ABC " -> "ABC"
            trim: true,
            required: true,
        },
        email: {type: String, trim: true, required: true, unique: true},
        password: {type: String, required: true, min: 6, max: 64},
        avatar: {type: String, default: "https://i.pinimg.com/originals/26/05/a3/2605a399d825cbc457479fa2df2bf953.jpg"
        },
        role: {type: [String], default: ["subscriber"] , enum: ["subscriber", "instructor", "admin"]},
        seller_id: "",
        accountSeller: {},
        accountSession: {},
        googleId: {type: String, default: ""}
    }, {
        timestamps: true,
    }
)
const User = mongoose.model("User", userSchema)
module.exports = User;