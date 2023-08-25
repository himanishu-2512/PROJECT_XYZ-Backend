const Post = require("../models/postModel");
const User = require("../models/userModel");
const Question = require("../models/questionModel");
const Answer = require("../models/answerModel");
const Comment = require("../models/commentModel");

module.exports.likepost = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const post = await Post.findById(postId);
    const user = await User.findById(userId);
    if (user) {
      if (post.likes.includes(userId)) {
        await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });
        res.json({ message: "Unliked post Successfully", status: 200 });
      } else {
        post.likes.unshift(userId);
        await post.save();
        res.json({ message: "Liked post Sucessfully", status: 200 });
      }
    } else {
      res.json({ message: "User not found", status: 404 });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, status: error.status });
  }
};

module.exports.likequestion = async (req, res) => {
  try {
    const { userId, questionId } = req.params;
    const question = await Question.findById(questionId);
    const user = await User.findById(userId);
    if (user) {
      if (question.likes.includes(userId)) {
        await Question.findByIdAndUpdate(questionId, {
          $pull: { likes: userId },
        });
        res.json({ message: "Unliked question Successfully", status: 200 });
      } else {
        question.likes.unshift(userId);
        await question.save();
        res.json({
          message: "Liked question Sucessfully",
          status: 200,
          LikesCount: question.likes.length,
        });
      }
    } else {
      res.json({ message: "User not found", status: 404 });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, status: error.status });
  }
};

module.exports.likeanswer = async (req, res) => {
  try {
    const { userId, answerId } = req.params;
    const answer = await Answer.findById(answerId);
    const user = await User.findById(userId);
    if (user) {
      if (answer.likes.includes(userId)) {
        await Answer.findByIdAndUpdate(answerId, { $pull: { likes: userId } });
        res.json({ message: "Unliked answer Successfully", status: 200 });
      } else {
        answer.likes.unshift(userId);
        await answer.save();
        res.json({
          message: "Liked answer Sucessfully",
          status: 200,
          LikesCount: answer.likes.length,
        });
      }
    } else {
      res.json({ message: "User not found", status: 404 });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, status: error.status });
  }
};

module.exports.likecomment = async (req, res) => {
  try {
    const { userId, commentId } = req.params;
    const comment = await Comment.findById(commentId);
    const user = await User.findById(userId);
    if (user) {
      if (comment.likes.includes(userId)) {
        await Comment.findByIdAndUpdate(commentId, {
          $pull: { likes: userId },
        });
        res.json({ message: "Unliked comment Successfully", status: 200 });
      } else {
        comment.likes.unshift(userId);
        await comment.save();
        res.json({
          message: "Liked comment Sucessfully",
          status: 200,
          LikesCount: comment.likes.length,
        });
      }
    } else {
      res.json({ message: "User not found", status: 404 });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, status: error.status });
  }
};
