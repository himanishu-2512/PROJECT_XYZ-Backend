const router = require("express").Router();
const {login,forgotPassword,register,verifyToken,allUsers,getUser,updateUser}=require("../controllers/userController")



router.post("/login",login)
router.post("/forgotPassword",forgotPassword)
router.post("/verifyToken",verifyToken)
router.get("/allusers",allUsers)
router.post("/register",register)
router.get("/user/:userId", getUser)
router.post("/updateuser/:userId", updateUser)
module.exports=router