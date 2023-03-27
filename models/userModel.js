const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        unique: true, 
        require: true 
    },

    email: { 
        type: String, 
        unique: true, 
        require: true },

    name: String,

    password: { 
        type: String, 
        unique: true, 
        require: true, 
        min: [8, 'Must be at least 8 character, got {VALUE}'], },

    college: [{ 
        type: String 
    }],

    city: String,

    bio: String,

    dob: Date,

    skills: [{ 
        type: String 
    }],

    isVerified: Boolean,

    isAdmin: Boolean,

    following: [{ 
        type: Schema.Types.ObjectId, 
        ref: "User" 
    }],

    followerCount: [{ 
        type: Number, 
        default: 0 
    }]
})


module.exports = mongoose.model("User", userSchema)