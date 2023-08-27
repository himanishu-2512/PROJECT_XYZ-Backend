const mongoose = require("mongoose");

const recentSchema = new mongoose.Schema({
  recentPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  recentQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

module.exports = mongoose.model("Recent", recentSchema);
