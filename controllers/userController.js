const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const sendMail = require("../utilities/nodemailer")

module.exports.register = async (req, res) => {
  try {
    const { rNum, dob, pass } = req.body;
    const user = await User.findOne({ rNum: rNum });

    if (user) {
      res.send({ message: "User already registered" });
    } else {
      const user = new User({
        rNum,
        dob,
        pass,
      });
      await user.save();
    }
  } catch (error) {
    console.log(error);
  }
};




module.exports.login = async (req, res) => {
  const { rNum, pass } = req.body;
  await User.findOne({ rNum: rNum }, (err, user) => {
    if (user) {
      if (pass === user.pass) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
};




// forgotPassword
module.exports.forgotPassword = async (req, res) => {
  try {
    const givenEmail = req.body.email;
    const givenUsername = req.body.username;
    const user =
      User.findOne({ email: givenEmail }) ||
      User.findOne({ username: givenUsername });
    const token = await Token.create({
      userId: user._id,
      token: randombytes(24).toString("hex"),
    });
    await sendMail(
      user.email,
      "Forgot Pasword? HUH, You DUMBFUCK!!!",
      `Token will be valid only for 1 hour!!! ${token}`
    );
    res.json({
      message: "URL to change password has been sent to your registered email",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error", status: false });
  }
};



//verify Token
module.exports.verifyToken = async (req, res) => {
  try {
    const givenToken = req.body.token;
    const token = Token.findOne({ token: givenToken });
    if (token) {
      const id = token.userId;
      const user = User.findById(id);
      res.send.json({ status: true }, user);
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error", status: false });
  }
};



//change password
module.exports.changePassword = async (req, res) => {
    try{
        const newPassword = req.body.password;


    }catch(error){
        console.log(error);
        res.json({message: "Internal server eroor", status: false})
    }
}







