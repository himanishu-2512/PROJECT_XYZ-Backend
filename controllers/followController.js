const User = require('../models/userModel')

module.exports.follow = async (req, res) => {
    try {
      const { followUserId, userId } = req.params;
      const userToFollow = await User.findById(followUserId);
      const user = await User.findById(userId);
      if (user && userToFollow) {
        if (user.following.includes(followUserId)) {
          await User.findByIdAndUpdate(userId, { $pull: { following: followUserId } },{new:true});
          await User.findByIdAndUpdate(followUserId, { $pull: { follower: userId } },{new:true});
          res.json({ message: "Unfollowed user Successfully", status: 200 });
        } else {
          user.following.unshift( userToFollow._id);
          userToFollow.follower.unshift(user._id)
          await userToFollow.save()
          await user.save();
          res.json({ message: "Followed user Sucessfully", status: 200 });
        }
      } else {
        res.json({ message: "User not found", status: 404 });
      }
    } catch (error) {
      console.log(error);
      res.json({ message: error.message, status: error.status });
    }
  };
