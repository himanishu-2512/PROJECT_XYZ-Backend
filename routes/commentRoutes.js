const { newComment } = require("../controllers/commentCntroller");

const router = require("express").Router();

router.post('/postId/newcomment', newComment)
router.post("/:commentId", newComment);

module.exports = router;