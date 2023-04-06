const Post = require("../models/postModel");
const User = require("../models/userModel");
const Question = require("../models/questionModel")
const Answer = require("../models/answerModel")

module.exports.likepost = async (req, res) => {
  try {
    const { postId, userId} = req.params;
    const post = await Post.findById(postId);
    
    if (post.likes.includes(userId) ){
      await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });
      res.json({message: "Unliked post Successfully", status: true});
  }else
    {post.likes.unshift(userId);
    await post.save();
    res.json({ message: "Liked post Sucessfully", status: true, "LikesCount": post.likes.length});}
  } catch (error) {
    console.log(error);
  }
};



module.exports.likequestion = async (req, res) => {
  try {
    const {userId,questionId } = req.params;
    const question = await Question.findById(questionId);
      
    if (question.likes.includes(userId)){
      await Question.findByIdAndUpdate(questionId, { $pull: { likes: userId } });
      res.json({message: "Unliked question Successfully", status: true});
  }else
    {question.likes.unshift(userId);
    await question.save();
    res.json({ message: "Liked question Sucessfully", status: true, "LikesCount": question.likes.length});}
  } catch (error) {
    console.log(error);
  }
};



module.exports.likeanswer = async (req, res) => {
  try {
    const { userId,answerId} = req.params;
    const answer = await Answer.findById(answerId);
    
    if (answer.likes.includes(userId)){
      await Question.findByIdAndUpdate(answerId, { $pull: { likes: userId } });
      res.json({message: "Unliked answer Successfully", status: true});
  }else
    {answer.likes.unshift(userId);
    await answer.save();
    res.json({ message: "Liked answer Sucessfully", status: true, "LikesCount": answer.likes.length});}
  } catch (error) {
    console.log(error);
  }
};