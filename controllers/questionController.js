const User = require("../models/userModel");
const Question = require("../models/questionModel")
const AnsComment = require("../models/ansCommentModel")
const Answer = require("../models/answerModel")
const cloudinary =require("../utilities/cloudinary")
const fs=require("fs")
const {fetch}=require("node-fetch")
// import FileType from "file-type"
// import fs from "fs";
// import fetch from "node-fetch";
// import FileType from "file-type";
module.exports.createQuestion = async (req,res) => {
    try{
  
        const {userId, img, title, description} = req.body;
        console.log(req.body.tempFilePath)
        const image=req.body
        
      fs.writeFile("pic.png", image, async(err) => {
        if (err) throw err;
        console.log("The file has been saved!");
        try {
          const result =await cloudinary.uploader.upload("\pic.png")
          console.log(result)
        } catch (error) {
          console.log()
        }
        
      });
         

        
       
        // const question = await Question.create({
        //     userId,
        //     image:img,
        //     title,
        //     description
        // })
        // const user = await User.findById(userId);
        // user.questions.push(question._id);
        // await user.save();
        res.json({ message: "Question Created sucessfully", status: true });
    }catch(error){
        console.log(error)
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
      await AnsComment.deleteMany({
        question: question._id
      });
      await Answer.deleteMany({
        _id: {
          $in: question.answers,
        },
      });
      
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
    const question = await Question.find({})
      .populate({
        path: "answers",
        populate: [
          { path: "author", select: "username name" },
          { path: "comments" },
        ],
      })
      .populate({ path: "userId", select: "username" });
    res.json({ message: "sucessfull", status: true, question });
  } catch (error) {
    console.log(error);

  }
};
module.exports.newAnswer = async (req,res) => {
  try{
    const {userId, questionId} = req.params;
    
    const question = await Question.findById(questionId);
    if(question){
      const { body } = req.body;
    const answer = await Answer.create({body});
    console.log(answer._id);
    question.answers.push(answer._id);
    answer.author = userId
   await answer.save();
    const ques = await question.save();
    
    res.json({
      message: "Answer Created sucessfully",
      status: true,
      answer,
    });}else{
      res.json({ mesage: "Question doesn't exists", status: false });
    }
  }catch(error){
    console.log(error);
  }
}
module.exports.updateAnswer=async(req,res)=>{
  try {
    const {questionId,answerId,userId}=req.params
  const answer=await Answer.findById(answerId)
  const question=await Question.findById(questionId)
  if(answer && question && (answer.author==userId)){
    const{ body }= req.body;
    answer.body=body;
    await answer.save();
    res.json({ message: "Answer Updated sucessfully", status: true });
  }else{
    res.json({message:"Answer or Question doesn't exists",status:false})
  }
}catch(error){
    console.log(error)
    res.json({message:error.meesage,status:false})
  }
}
module.exports.deleteAnswer = async (req, res) => {
  try {
    const { questionId, answerId, userId } = req.params;
    const answer = await Answer.findById(answerId);
    if (answer.author == userId) {
      await Question.findByIdAndUpdate(questionId, {
        $pull: { answers: answerId },
      });
      await AnsComment.deleteMany({
        answer: answer._id,
      });
      await Answer.findByIdAndDelete(answerId);

      res.json({ message: "Answers Deleted sucessfully", status: true });
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
module.exports.getquestionbyid=async(req,res)=>{
  try {
    const {questionId}=req.params;
  const question =await Question.findById(questionId).populate({path:'userId',select:"username"});
  
  res.json({ message: "sucessful", status: true, question });
  } catch (error) {
    console.log(error)
    res.json({status:false,message:error.message})
  }

}
module.exports.userquestions=async(req,res)=>{
  try {
    const {username}=req.params;
    const posts=await User.findOne({username}).select('questions').populate({path:'questions'})
    res.json({message:"sucessful",status:true,posts});

  } catch (error) {
    console.log(error)
    res.json({message:"sucessful",status:false,message:error.message})
  }
}
module.exports.savequestions=async(req,res)=>{
  try {
  const {questionId}=req.params;
  const {userId}=req.body;
  const user = await User.findById(userId);
  
  if (user.savedQuestions.includes(questionId)){
    await User.findByIdAndUpdate(user, { $pull: { savedQuestions: questionId} });

    res.json({message: "Unsaved question Successfully", status: true})    
  }
  else{
  user.savedQuestions.unshift(questionId);
  await user.save();
  res.json({ message: "question saved sucessfully", status: true});
} 
}catch (error) {
    console.log(error)
    res.json({status:false,message:error.message})
    
  }
}
module.exports.getsavequestions=async(req,res)=>{
  try {
    const {userId}=req.params;
    const posts=await User.findById(userId).select('savedQuestions').populate({path:'savedQuestions'});
    res.json({message:"sucessful",status:true,posts});

  } catch (error) {
    console.log(error)
    res.json({status:false,message:error.message})
  }
}
module.exports.getQuestionsComments = async (req, res) => {
  try {
    const { questionId } = req.params;
    // console.log(post)
    const questions = await Question.findById(questionId).populate({
      path: "answers",
      populate: { path: "author", select: "username name" },
    }).select('answers');

    res.json({
      message: "Comment view successful",
      status: true,
      questions,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: error.message });
  }
};