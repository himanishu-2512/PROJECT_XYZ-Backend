const router = require("express").Router();
const {login,forgotPassword,register,verifyToken,allUsers,getUser,updateUser, getuserbyusername}=require("../controllers/userController")



router.post("/login",login)
router.post("/forgotPassword",forgotPassword)
router.post("/verifyToken",verifyToken)
router.get("/allusers",allUsers)
router.post("/register",register)
router.get("/user/:username", getUser)
router.post("/updateuser/:userId", updateUser)
router.get("/profile/:username",getuserbyusername)
module.exports=router