const mongoose = require("mongoose");
const Post = require("./postModel");

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
    type: String,
  },

  password: {
    type: String,
    require: true,
    min: [8, "Must be at least 8 characters, got {VALUE}"],
  },

  college: [
    {
      type: String,
    },
  ],

  city: {
    type: String,
  },

  bio: {
    type: String,
  },

  dob: {
    type: Date,
  },

  skills: [
    {
      type: String,
    },
  ],

  isVerified: {
    type: Boolean,
    default: false,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  follower: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
  notifications: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
      action: {
        type: String,
      },
    },
  ],
  notificationsCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema, "users");
