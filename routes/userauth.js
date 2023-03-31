const router = require("express").Router();
const {login,forgotPassword,register, verifyToken}=require("../controllers/userController")


router.post("/login",login)
router.post("/forgotPassword",forgotPassword)
router.post("/verifyToken",verifyToken)

router.post("/register",register)
module.exports=router