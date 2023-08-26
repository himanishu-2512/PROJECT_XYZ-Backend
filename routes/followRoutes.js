const { follow } = require("../controllers/followController");
const router = require("express").Router();

router.post('/:followUserId/:userId', follow);
module.exports = router;