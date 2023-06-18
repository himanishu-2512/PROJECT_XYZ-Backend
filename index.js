
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/userauth");
const postRoutes = require("./routes/postRoutes")
const commentRoutes = require("./routes/commentRoutes")
const likesRoutes = require("./routes/likesRoutes")
const questionRoutes = require("./routes/questionRoutes")
require("dotenv").config()
const app = express()
app.use(express.json())

app.use(cors({
    origin:'*',
}))


mongoose.connect(process.env.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log("no")
    console.log(err.message);
    console.log(err)
  })
app.use("/api/auth",authRoutes)
app.use("/api/post",postRoutes)
app.use("/api/question",questionRoutes)
app.use("/api/comment",commentRoutes)
app.use("/api/like",likesRoutes)





app.get("/",(req,res)=>{
    res.send("true")
})


app.listen(8000,() => {
    console.log("BE started at port 8000")
})