const { newComment,updateComment, deleteComment } = require("../controllers/commentController");

const router = require("express").Router();

router.post('/:postId/:userId/newcomment', newComment)
router.post("/:postId/:userId/:commentId/updatecomment", updateComment);
router.post("/:postId/:userId/:commentId/deletecomment", deleteComment);

module.exports = router;