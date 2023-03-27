const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    rNum: String,
    dob: String,
    pass: String
})


module.exports=mongoose.model("User", userSchema)