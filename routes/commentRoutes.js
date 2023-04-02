const { newComment } = require("../controllers/commentCntroller");

const router = require("express").Router();

router.post('/newcomment', newComment)
router.post("/:commentId", newComment);

module.exports = router;