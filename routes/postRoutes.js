const { createPost, updatePost, deletePost,allPosts,userposts,friendspost } = require("../controllers/postController");
const router = require("express").Router();


router.get("/myposts/:username",userposts)
router.post("/newpost", createPost);
router.get("/followings/:userid",friendspost)
router.post("/updatepost/:userId/:postId", updatePost);
router.delete("/deletepost/:userId/:postId", deletePost);
router.get("/allposts",allPosts)
module.exports = router;