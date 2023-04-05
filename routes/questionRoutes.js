const router = require("express").Router();
const {createQuestion, updateQuestion,deleteQuestion, allQuestions} = require("../controllers/questionController")


router.post("/newquestion", createQuestion);
router.post("/updatequestion/:userId/:questionId", updateQuestion);
router.delete("/deletequestion/:userId/:questionId", deleteQuestion);
router.get("/allquestions", allQuestions);

module.exports = router;