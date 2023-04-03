const { like } = require("../controllers/likesController");
const router = require("express").Router();

router.post('/:postId/:userId', like);

module.exports = router;