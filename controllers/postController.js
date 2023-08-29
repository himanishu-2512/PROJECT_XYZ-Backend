const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const Recent = require("../models/recentModel");
const recentId = "64ea6ffcb20d9c4bfa137908";
//create a new post
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
    user.posts.push(post._id);
    await Recent.findByIdAndUpdate(recentId, {
      $push: {
        recentPosts: {
          $each: [post._id],
          $position: 0,
          $slice: 10,
        },
      },
    });
    await user.save();
    res.json({ message: "Post Created sucessfully", status: true, post });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, status: error.status });
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
    res.json({ message: error.message, status: error.status });
  }
};

//delete Post
module.exports.deletePost = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    console.log(userId, postId);
    const post = await Post.findById(postId);

    if (post.userId == userId) {
      await Comment.deleteMany({
        _id: {
          $in: post.comments,
        },
      });
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
    res.json({ message: error.message, status: error.status });
  }
};

//get post by username
module.exports.userposts = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username })
      .select("posts")
      .populate({ path: "posts" });
    res.json({ message: "sucessful", status: true, user });
  } catch (error) {
    console.log(error);
    res.json({ message: "sucessful", status: false });
  }
};
//get all posts
module.exports.allPosts = async (req, res) => {
  try {
    const post = await Post.find()
      .populate({
        path: "comments",
        populate: { path: "author", select: "username name" },
      })
      .populate({ path: "userId", select: "username name" });
    res.json({ message: "All posts", status: "true", post });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, status: "false" });
  }
};

//get friends posts
module.exports.friendspost = async (req, res) => {
  try {
    const { userid } = req.params;
    const friends = await User.findById(userid).select("following");
    const posts = await Post.find({ userId: { $in: friends.following } });
    res.json({ message: "sucessful", status: true, posts });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, status: false });
  }
};

module.exports.saveposts = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (user.savedPosts.includes(postId)) {
      await User.findByIdAndUpdate(user, { $pull: { savedPosts: postId } });

      res.json({ message: "Unsaved post Successfully", status: true });
    } else {
      user.savedPosts.unshift(postId);
      await user.save();
      res.json({ message: "post saved sucessfully", status: true });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "sucessful", status: false, message: error.message });
  }
};

module.exports.getsaveposts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await User.findById(userId)
      .select("savedPosts").populate({
        path: "savedPosts",
        populate: { path: "userId", select: "username name" },
      })
    res.json({ message: "sucessful", status: true, posts });
  } catch (error) {
    console.log(error);
    res.json({ message: "sucessful", status: false, message: error.message });
  }
};
module.exports.getpostbyid = async (req, res) => {
  try {
    const { postId } = req.params;
    console.log(postId);
    const post = await Post.findById(postId).populate({
      path: "userId",
      select: "username",
    });

    res.json({ message: "successful", status: true, post });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: error.message });
  }
};
module.exports.getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    // console.log(post)
    const post = await Post.findById(postId).populate({
      path: "comments",
      populate: { path: "author", select: "username name" },
    });

    res.json({
      message: "Comment view successful",
      status: true,
      post,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: error.message });
  }
};
