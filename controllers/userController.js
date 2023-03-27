const User=require("../models/userModel")
module.exports.login= async(req, res)=> {
    const { rNum, pass} = req.body
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


module.exports.register=async (req, res)=> {
    try{
    const { rNum, dob, pass} = req.body
   const user=await User.findOne({rNum: rNum})
    
        if(user){
            res.send({message: "User already registered"})
        } else {
            const user =  new User({
                rNum,
                dob,
                pass
            })
            await user.save()
        }
    }
catch(error){
    console.log(error)
}}
    
