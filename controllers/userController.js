const User=require("../models/userModel")
const bcrypt = require('bcrypt');
module.exports.login= async(req, res)=> {
    const { email,username, password} = req.body
    await User.findOne({ rNum: rNum}, (err, user) => {
        if(user){
            if(pass === user.pass ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}


module.exports.forgotPassword=async(req, res)=> {
    const { rNum,dob, pass} = req.body
    await User.findOne({ rNum: rNum}, (err, user) => {
        if(user){
            if(dob === user.dob ) {
                updateDocument(user.id, pass);
                res.send({message: "Password Changed", user: user})
            } else {
                res.send({ message: "Date Of Birth didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}


//change password
module.exports.changePassword = async (req, res) => {
    try{
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
            // console.log(user)
            res.send('User registered')
            // await user.save()
        }
    }
catch(error){
    console.log(error)
}}
    
