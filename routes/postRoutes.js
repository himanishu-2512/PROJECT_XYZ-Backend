const { createPost,
     updatePost,
      deletePost,
      allPosts,
      userposts,
      friendspost,
      saveposts,
      getsaveposts,
      getpostbyid } = require("../controllers/postController");
const router = require("express").Router();


router.get("/myposts/:username",userposts)
router.post("/newpost", createPost);
router.get("/followings/:userid",friendspost)
router.post("/saveposts/:postId",saveposts)
router.get("/getsaveposts/:userId",getsaveposts);
router.post("/updatepost/:userId/:postId", updatePost);
router.delete("/deletepost/:userId/:postId", deletePost);
router.get("/allposts",allPosts)
router.get("/getpost/:postId",getpostbyid)
module.exports = router;