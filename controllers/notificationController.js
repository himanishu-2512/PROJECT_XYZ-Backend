const User = require("../models/userModel");

module.exports.notification = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate({
      path: "notifications",
      select: "userId postId",
      populate: { path: "userId postId", select: "username name title" },
    });
    if (user) {
      res.json({
        status: 200,
        notifications: user.notifications,
        notificationsCount: user.notificationsCount,
      });
    } else {
      res.json({ message: "User not found", status: 404 });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, status: error.status });
  }
};

module.exports.updateNotificationCount = async (req, res) => {
  try {
    const { userId, newCount } = req.params;
    const user = await User.findById(userId);
    if (user) {
      user.notificationsCount = newCount;
      user.save();
      res.json({
        message: "Count Updated Successfully",
        status: 200,
      });
    } else {
      res.json({ message: "User not found", status: 404 });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, status: error.status });
  }
};
