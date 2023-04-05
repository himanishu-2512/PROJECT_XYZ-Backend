const { newComment,allcomments } = require("../controllers/commentCntroller");

const router = require("express").Router();

router.post('/:postId/:userId/newcomment', newComment)
router.post("/:commentId", newComment);
router.post("/allposts")

module.exports = router;