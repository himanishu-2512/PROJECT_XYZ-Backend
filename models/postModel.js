const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User=require('./userModel')


const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    img: {
      type: String
    },
    title: {
      type: String,
      require: true,
    },
    caption: {
      type: String,
      require: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [

      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema, 'posts');
