const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true,
  },

  email: {
    type: String,
    unique: true,
    require: true,
  },

  name: String,

  password: {
    type: String,
    unique: true,
    require: true,
    min: [8, "Must be at least 8 character, got {VALUE}"],
  },

  college: [
    {
      type: String,
    },
  ],

  city: String,

  bio: String,

<<<<<<< HEAD
    password: { 
        type: String, 
        require: true, 
        min: 8 },
=======
  dob: Date,
>>>>>>> 6ae1a445a08bd4107a1729ea23db16317036105b

  skills: [
    {
      type: String,
    },
  ],

  isVerified: Boolean,

  isAdmin: Boolean,

  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  followerCount: [
    {
      type: Number,
      default: 0,
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  savedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  savedQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

<<<<<<< HEAD
    isVerified: Boolean,

    isAdmin: Boolean,

    following: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }],

    followerCount: [{ 
        type: Number, 
        default: 0 
    }]
})


module.exports = mongoose.model("User", userSchema)
=======
module.exports = mongoose.model("User", userSchema);
>>>>>>> 6ae1a445a08bd4107a1729ea23db16317036105b
