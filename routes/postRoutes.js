const { createPost, updatePost, deletePost } = require("../controllers/postController");
const router = require("express").Router();



router.post("/newpost", createPost);
router.post("/updatepost/:userId/:postId", updatePost);
router.delete("/deletepost/:userId/:postId", deletePost);
module.exports = router;