const { createPost, updatePost, deletePost,allPosts } = require("../controllers/postController");
const router = require("express").Router();



router.post("/newpost", createPost);
router.post("/updatepost/:userId/:postId", updatePost);
router.delete("/deletepost/:userId/:postId", deletePost);
router.get("/allposts",allPosts)
module.exports = router;