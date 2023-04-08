const Post = require("../models/postModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");

module.exports.newComment = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const post = await Post.findById(postId);
    if(post){
    const { body } = req.body;
    const comment = await Comment.create({ body });
    comment.author = userId;
    post.comments.push(comment._id);
   await comment.save()
    const pst= await post.save();
    if(pst)
    res.json({ message: "comment created sucessfully", status: true });}
    else{
      res.json({mesage:"Post doesn't exists",status:false})
    }
  } catch (error) {
    console.log(error);
    res.json({mesage:"Comment unsucessful",status:false})
  }
};

module.exports.updateComment=async(req,res)=>{
  try {
    const {postId,commentId,userId}=req.params
  const comment=await Comment.findById(commentId)
  const post=await Post.findById(postId)
  if(comment&&post&&(comment.author==userId)){
    const {body} = req.body
    comment.body= body;
    await comment.save();
  }else{
    res.json({message:"Post or comment doesn't exists",status:false})
  }
  } catch (error) {
    console.log(error)
    res.json({message:error.meesage,status:false})

  }



}

module.exports.deleteComment = async (req, res) => {
  try {
    const { postId, commentId ,userId} = req.body;
const post=await Post.findById(postId)
const comment= await Comment.findById(commentId)
if(comment&&post&&(post.userId==userId||comment.author==userId)){
    await Post.findByIdAndUpdate(postId, {
      $pull: { comments: commentId },
    });
    await Comment.findByIdAndDelete(commentId);
  res.json({message:"comment deleted sucessfully",status:true})}
  else
  res.json({message:"Post or comment doesn't exists",status:false})
  } catch (error) {
    console.log(error);
    res.json({message:error.meesage,status:false})
  }
};


