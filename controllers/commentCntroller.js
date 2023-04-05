const Post = require("../models/postModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");

module.exports.newComment = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const post = await Post.findById(postId);
    const { body } = req.body;
    const comment = new Comment.create({ body });
    comment.author = userId;
    post.comments.push(comment._id);
    await comment.save();
    await post.save();
    res.json({ message: "comment created sucessfully", status: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    await Post.findByIdAndUpdate(postId, {
      $pull: { comments: commentId },
    });
    await Comment.findByIdAndDelete(commentId);
  } catch (error) {
    console.log(error);
  }
};

module.exports.allcomments=async (req,res)=>{
  try {
    const postid=req.postId
    const post=Post.findById(postid)
    let comments=[]
    post.comment.map((e)=>{
      const comment=Comment.findById(e);
      comments.push(comment)
    })
    res.json({message:"suceesful",status:true,comments})
    
  } catch (error) {
    console.log(error)
    res.json({message:error.message,status:false})
    
  }
}
