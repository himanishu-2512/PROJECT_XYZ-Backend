const Post = require("../models/postModel");
const User = require("../models/userModel");

module.exports.like = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const post = await Post.findById(postId);
    if (post.likes.includes(userId)){
      await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });
      res.json({message: "Unliked Successfully", status: true});
  }else
    {post.likes.unshift(userId);
    await post.save();
    res.json({ message: "Liked Sucessfully", status: true, "LikesCount": post.likes.length});}
  } catch (error) {
    console.log(error);
  }
};