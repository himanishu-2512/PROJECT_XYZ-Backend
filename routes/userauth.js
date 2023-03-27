const router = require("express").Router();
const {login,forgotPassword,register}=require("../controllers/userController")


router.post("/login",login)
router.post("/forgotPassword",forgotPassword)
router.post("/register",register)
module.exports=router