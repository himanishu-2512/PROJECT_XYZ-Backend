const router = require("express").Router();
const {createQuestion, updateQuestion,deleteQuestion, allQuestions, newAnswer, updateAnswer} = require("../controllers/questionController")


router.post("/newquestion", createQuestion);
router.post("/updatequestion/:userId/:questionId", updateQuestion);
router.delete("/deletequestion/:userId/:questionId", deleteQuestion);
router.get("/allquestions", allQuestions);
router.post("/answer/newanswer/:userId/:questionId", newAnswer);
router.post("/answer/updateanswer/:userId/:questionId/:answerId", updateAnswer)

module.exports = router;