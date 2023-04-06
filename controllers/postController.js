const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

module.exports.createPost = async (req, res) => {
  try {
    const { userId, img, title, caption } = req.body;
    const post = await Post.create({
      userId,
      img,
      title,
      caption,
    });
    const user = await User.findById(userId);
    console.log(user, post._id);
    user.posts.push(post._id);
    await user.save();
    console.log(user, post._id);
    res.json({ message: "Post Created sucessfully", status: true, post });
  } catch (error) {
    console.log(error);
  }
};

//update Post
module.exports.updatePost = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const { img, title, caption } = req.body;
    const post = await Post.findById(postId);
    if (post.userId == userId) {
      const postnum = await Post.findByIdAndUpdate(
        postId,
        {
          img,
          title,
          caption,
        },
        { new: true }
      );

      res.json({ message: "Post Updated sucessfully", status: true, postnum });
    } else {
      res.json({
        message: "You are not authorized to perform this action",
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//delete Post
module.exports.deletePost = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    console.log(userId, postId);
    const post = await Post.findById(postId);
    if (post.userId == userId) {
      await User.findByIdAndUpdate(userId, { $pull: { posts: postId } });
      await Post.findByIdAndDelete(postId);

      res.json({ message: "Post Deleted sucessfully", status: true });
    } else {
      res.json({
        message: "You are not authorized to perform this action",
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.allPosts = async (req, res) => {
  try {
    const post = await Post.find()
      .populate({ path: "comments", populate: { path: 'author' ,select: 'username'} })
    res.json({ message: "All posts", status: "true", post });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, status: "false" });
  }
};
