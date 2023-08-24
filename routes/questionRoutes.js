const router = require("express").Router();
const {createQuestion,
     updateQuestion,
     deleteQuestion,
      allQuestions,
       newAnswer,
        updateAnswer,
         deleteAnswer,
         userquestions,
         savequestions,
         getsavequestions,
         getquestionbyid
     ,getQuestionsComments} = require("../controllers/questionController")


router.post("/newquestion", createQuestion);
router.post("/updatequestion/:userId/:questionId", updateQuestion);
router.delete("/deletequestion/:userId/:questionId", deleteQuestion);
router.get("/allquestions", allQuestions);
router.post("/answer/newanswer/:userId/:questionId", newAnswer);
router.get("/questions/user/:username",userquestions);
router.post("/questions/savequestions/:questionId",savequestions)
router.get("/getsavequestions/:userId",getsavequestions)
router.get("/getquestion/:questionId",getquestionbyid)
router.post("/answer/updateanswer/:userId/:questionId/:answerId", updateAnswer)
router.post("/answer/deleteanswer/:userId/:questionId/:answerId", deleteAnswer)
router.get("/getquestionscomments/:questionId",getQuestionsComments)

module.exports = router;