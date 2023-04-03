const mongoose = require("mongoose");
const Post=require('./postModel')

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

  name: {
    type:String,
  },

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

  dob: Date,

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

module.exports = mongoose.model("User", userSchema);
