const { allRecents } = require("../controllers/recentController");
const router = require("express").Router();

router.get('/get-recents', allRecents);
module.exports = router;