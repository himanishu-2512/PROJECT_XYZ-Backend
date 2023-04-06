const { likepost, likequestion, likeanswer } = require("../controllers/likesController");
const router = require("express").Router();

router.post('/post/:postId/:userId', likepost);
router.post('/question/:questionId/:userId', likequestion )
router.post('/answer/:answerId/:userId', likeanswer)
module.exports = router;