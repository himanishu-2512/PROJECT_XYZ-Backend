const Recent = require("../models/recentModel");
const recentId = "64ea6ffcb20d9c4bfa137908";

module.exports.allRecents = async (req, res) => {
  try {
    const recent = await Recent.findById(recentId).populate({
      path: "recentQuestions recentPosts",
      select: "_id userId title createdAt",
      populate: { path: "userId", select: "username name" },
    });
    res.json({ message: "All recent activities", status: "true", recent });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, status: "false" });
  }
};
