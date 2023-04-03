const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const sendMail = require("../utilities/nodemailer")
const bcrypt=require("bcrypt")
const randombytes=require("randombytes")

module.exports.register = async (req, res) => {
  try {
    const { email, username, password} = req.body
    const user=await User.findOne({email:email})|| await User.findOne({username : username})
     
         if(user){
             res.send({message: "User already registered"})
         } else {
           const pass =await bcrypt.hash(password, 10)
           console.log(pass)
             const user =  await  User.create({
                 username,
                 email,
                 password:pass,
             })
           
             if(user)
             res.send('User registered')
             
         }
  } catch (error) {
    console.log(error);
  }
};




module.exports.login = async (req, res) => {
  const { username,password} = req.body;
  const usernam=await User.findOne({email:username})|| await User.findOne({usernam : username});


    if (username) {
      const pass=await bcrypt.compare(password,username.password)
      if(!pass){
        return res.json({message:"password is wrong" ,status:false})}
        console.log(username)
        return res.json({message:"login sucessful",status:true,user:usernam
      })

  }
  return res.json({message:"login unsucessful",status:false
})}




// forgotPassword
module.exports.forgotPassword = async (req, res) => {
  try {
    const user = req.body.user;
    
    const username =
     await User.findOne({ email:user }) ||
     await User.findOne({ username:user });
      if(username){
        
    const token = await Token.create({
      userId: username._id,
      token: randombytes(6).toString("hex"),
    });
    console.log(username)
    const send=
    await sendMail(
      username.email,
      "Forgot Pasword? HUH, You DUMBFUCK!!!",
      `Token will be valid only for 1 hour!!! ${token.token}`
    );
    
    res.json({
      message: "URL to change password has been sent to your registered email",
      status: true,
    });}
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error", status: false });
  }
};



//verify Token
module.exports.verifyToken = async (req, res) => {
  try {
    const {token,password,user} = req.body;
    const username =
     await User.findOne({ email:user }) ||
     await User.findOne({ username:user });
    const tokenn = Token.findOne({ token:token ,
    userId:username._id});
    if (tokenn) {
      const id = username._id;
      const hashedpassword=await bcrypt.hash(password,10) 
      const usere=await User.findByIdAndUpdate(id,{
        password:hashedpassword,
      },{new:true})
      if(usere)
      res.json({message:"new password set sucessfully",status:true,usere})
    }
    else{
      res.json({
        message: "OTP is wrong!!.",
        status: true,
        usere,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error. Failed to set new Password.", status: false });
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







