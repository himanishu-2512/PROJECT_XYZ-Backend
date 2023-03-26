import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    rNum: String,
    dob: String,
    pass: String
})

const User = new mongoose.model("User", userSchema)

//Updating The Password
const updateDocument = async (_id, pass) => {
    try{
        const result = await User.updateOne({_id},{
            $set:{
                pass:pass
            }
        })
        //console.log(result)
    } catch (err){
        //console.log(err)
    }
}


//Routes
app.post("/login", (req, res)=> {
    const { rNum, pass} = req.body
    User.findOne({ rNum: rNum}, (err, user) => {
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
}) 

app.post("/forgot", (req, res)=> {
    const { rNum,dob, pass} = req.body
    User.findOne({ rNum: rNum}, (err, user) => {
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
}) 

app.post("/register", (req, res)=> {
    const { rNum, dob, pass} = req.body
    User.findOne({rNum: rNum}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                rNum,
                dob,
                pass
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 

app.listen(9002,() => {
    console.log("BE started at port 9002")
})