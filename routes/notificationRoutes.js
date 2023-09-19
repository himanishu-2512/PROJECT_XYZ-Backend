const {
  notification,
  updateNotificationCount,
} = require("../controllers/notificationController");
const router = require("express").Router();

router.get("/get-notifications/:userId", notification);
router.get("/update-count/:userId/:newCount", updateNotificationCount);
module.exports = router;
