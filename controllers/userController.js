const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const sendMail = require("../utilities/nodemailer");
const bcrypt = require("bcrypt");


module.exports.register = async (req, res) => {
  try {
    const { email, username, password, name } = req.body;
    const user =
      (await User.findOne({ email: email })) ||
      (await User.findOne({ username: username }));

    if (user) {
      res.send({ message: "User already registered" });
    } else {
      const pass = await bcrypt.hash(password, 10);
      console.log(pass);
      const user = await User.create({
        username,
        email,
        password: pass,
        name,
      });

      if (user) res.json({ message: "User registered",status:true,user: user });
      else res.json({ message: "User not registered",status:false });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error.message,status: false });

  }
};


module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
  const usernam =
    (await User.findOne({ email: username })) ||
    (await User.findOne({ username: username }));

  if (usernam) {
    const pass = await bcrypt.compare(password, usernam.password);
    if (!pass) {
      return res.json({ message: "password is wrong", status: false });
    }
    console.log(username);
    return res.json({
      message: "login sucessful",
      status: true,
      user: usernam,
    });
  }
  return res.json({ message: "login unsucessful", status: false });
  } catch (error) {
    res.json({ message: error.message,status: false });
  }
};

// forgotPassword
module.exports.forgotPassword = async (req, res) => {
  try {
    const user = req.body.user;

    const username =
      (await User.findOne({ email: user })) ||
      (await User.findOne({ username: user }));
    if (username) {
      const token = await Token.create({
        userId: username._id,
        token: Math.floor(Math.random()*1000000),
      });
      console.log(username);
      const send = await sendMail(
        username.email,
        "Password Reset Request",
        `Hello, this is the token requested for password reset, the token will be valid only for 1 hour!!! 
        ${token.token}`
      );

      res.json({
        message:
          "Token to change password has been sent to your registered email",
        status: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ message:error.message, status: false });
  }
};

//verify Token
module.exports.verifyToken = async (req, res) => {
  try {
    const {token, password, user} = req.body;
    const username =
      (await User.findOne({ email: user })) ||
      (await User.findOne({ username: user }));
    if(username){
    const tokenn=await Token.findOne({ token: token, userId: username._id });
    if (tokenn) {
      const id = username._id;
      const hashedpassword = await bcrypt.hash(password, 10);
      username.password=hashedpassword;
      username.save();
        res.json({
          message: "new password set sucessfully",
          status: true,
          username,
        });
    } else {
      res.json({
        message: "OTP is wrong!!.",
        status: false,
        
      });
    }
  }
  else{
    res.json({
      message: "Username or email is wrong.",
      status: false,
      
    });
  }
 }catch (error) {
    console.log(error);
    res.json({
      message: error.message,
      status: false,
    });
  }
};



//change password
module.exports.changePassword = async (req, res) => {
  try {
    const newPassword = req.body.password;
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server eroor", status: false });
  }
};

//get all users
module.exports.allUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.json({ message: "suceseful", status: true, user });
  } catch (error) {
    console.log(error);
    res.json({message:error.message,status:false})
  }
};

//get one user
module.exports.getUser = async (req, res) => {
  try {
    const { username } = req.params;
    console.log(username);
    const user = await User.findOne({username : username}).populate({path: "following follower", select: "username name"});
    if (user) {
      res.json({ message: "User Details", status: true, user });
    } else {
      res.json({ message: "No user found", status: false });
    }
  } catch (error) {
    res.json({message:error.message,status:false})
  }
};


//update user
module.exports.updateUser = async (req, res) => {
  try {
    console.log(req.body);
    const { userId } = req.params;
    const { name, bio, skills,dob, city } = req.body;
    console.log(userId);
    const user = await User.findById(userId);
    if (user) {
      const userUp = await User.findByIdAndUpdate(
        userId,
        {
          city,
          name,
          bio,
          skills,
          dob,
        },
        { new: true }
      );

      res.json({
        message: "User Updated Successfully",
        status: true,
        userUp,
      });
    } else {
      res.json({
        message: "User not found",
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({message:error.message,status:false})
  }
};
