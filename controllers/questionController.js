const User = require("../models/userModel");
const Question = require("../models/questionModel")
const Comment = require("../models/commentModel")
const Answer = require("../models/answerModel")

module.exports.createQuestion = async (req,res) => {
    try{
        const {userId, img, title, description} = req.body;
        const question = await Question.create({
            userId,
            img,
            title,
            description
        })
        const user = await User.findById(userId);
        user.questions.push(question._id);
        await user.save();
        res.json({ message: "Question Created sucessfully", status: true, question });
    }catch(error){
        console.log(error);
    }
}

module.exports.updateQuestion = async (req,res) => {
    try{
        const {userId, questionId} = req.params
        const {img, title, description} = req.body;
        const question = await Question.findById(questionId);
        if(question.userId == userId){
            const questionUp = await Question.findByIdAndUpdate(question, {
                img,
                title,
                description
            },{new: true})
            res.send({message: "Question Updated successfully", status: true, questionUp})
        }
        else{
            res.send({message: "You are not authorised to perform this action", status: false})
        }
    }catch(error){
        console.log(error)
    }
}


module.exports.deleteQuestion = async (req, res) => {
  try {
    const { userId, questionId } = req.params;
    const question = await Question.findById(questionId);
    if (question.userId == userId) {
      await User.findByIdAndUpdate(userId, { $pull: { questions: questionId } });
      await Question.findByIdAndDelete(questionId);

      res.json({ message: "Question Deleted sucessfully", status: true });
    } else {
      res.json({
        message: "You are not authorized to perform this action",
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.allQuestions = async (req, res) => {
  try {
    const question = await Question.find({});
    res.json({ message: "suceseful", status: true, question });
  } catch (error) {
    console.log(error);
  }
};