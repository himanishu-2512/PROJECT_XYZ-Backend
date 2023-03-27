
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/userauth");
const app = express()
app.use(express.json())
// app.use(express.urlencoded())
app.use(cors())

const uri = "mongodb+srv://7thies6m:ABHKPV2002@cluster0.bddtv2y.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log("no")
    console.log(err.message);
  });

app.use("/api/auth",authRoutes)



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




app.listen(8000,() => {
    console.log("BE started at port 8000")
})