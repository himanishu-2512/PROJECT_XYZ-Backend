const User = require("../models/userModel");
const Question = require("../models/questionModel");
const AnsComment = require("../models/ansCommentModel");
const Answer = require("../models/answerModel");
const Recent = require("../models/recentModel");
const recentId = "64ea6ffcb20d9c4bfa137908";

module.exports.createQuestion = async (req, res) => {
  try {
    const { userId, img, title, description } = req.body;
    const question = await Question.create({
      userId,
      img,
      title,
      description,
    });
    const user = await User.findById(userId);
    user.questions.push(question._id);
    //console.log(question._id)
    await Recent.findByIdAndUpdate(recentId, {
      $push: {
        recentQuestions: {
          $each: [question._id],
          $position: 0,
          $slice: 10,
        },
      },
    });
    await user.save();
    res.json({
      message: "Question Created sucessfully",
      status: true,
      question,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, status: error.status });
  }
};

module.exports.updateQuestion = async (req, res) => {
  try {
    const { userId, questionId } = req.params;
    const { img, title, description } = req.body;
    const question = await Question.findById(questionId);
    if (question.userId == userId) {
      const questionUp = await Question.findByIdAndUpdate(
        question,
        {
          img,
          title,
          description,
        },
        { new: true }
      );
      res.send({
        message: "Question Updated successfully",
        status: true,
        questionUp,
      });
    } else {
      res.send({
        message: "You are not authorised to perform this action",
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, status: error.status });
  }
};
module.exports.deleteQuestion = async (req, res) => {
  try {
    const { userId, questionId } = req.params;
    const question = await Question.findById(questionId);
    if (question.userId == userId) {
      await User.findByIdAndUpdate(userId, {
        $pull: { questions: questionId },
      });
      await AnsComment.deleteMany({
        question: question._id,
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
    res.json({ message: error.message, status: error.status });
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

    res.json({ message: error.message, status: error.status });
  }
};
module.exports.newAnswer = async (req, res) => {
  try {
    const { userId, questionId } = req.params;
    const ownerUser = await User.findById(userId);

    const question = await Question.findById(questionId);
    if (question) {
      const { body } = req.body;
      const answer = await Answer.create({ body });
      console.log(answer._id);
      question.answers.push(answer._id);
      answer.author = userId;
      await answer.save();
      const ques = await question.save();
      if (userId !== ownerUser)
        ownerUser.notifications.push({
          userId: userId,
          postId: questionId,
          action: "answer",
        });
      await ownerUser.save();

      res.json({
        message: "Answer Created sucessfully",
        status: true,
        answer,
      });
    } else {
      res.json({ mesage: "Question doesn't exists", status: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, status: error.status });
  }
};
module.exports.updateAnswer = async (req, res) => {
  try {
    const { questionId, answerId, userId } = req.params;
    const answer = await Answer.findById(answerId);
    const question = await Question.findById(questionId);
    if (answer && question && answer.author == userId) {
      const { body } = req.body;
      answer.body = body;
      await answer.save();
      res.json({ message: "Answer Updated sucessfully", status: true });
    } else {
      res.json({ message: "Answer or Question doesn't exists", status: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error.meesage, status: false });
  }
};
module.exports.deleteAnswer = async (req, res) => {
  try {
    const { questionId, answerId, userId } = req.params;
    const question = Question.findById(questionId);
    const answer = await Answer.findById(answerId);
    const ownerUser = await User.findById(userId);
    if (
      question &&
      answer &&
      (answer.author == userId || question.userId == userId)
    ) {
      await Question.findByIdAndUpdate(questionId, {
        $pull: { answers: answerId },
      });
      await AnsComment.deleteMany({
        answer: answer._id,
      });
      await Answer.findByIdAndDelete(answerId);
      if (userId != ownerUser) {
        await User.findByIdAndUpdate(ownerUser._id, {
          $pull: {
            notifications: {
              userId: userId,
              postId: questionId,
              action: "answer",
            },
          },
        });
      }
      res.json({ message: "Answer Deleted sucessfully", status: true });
    } else {
      res.json({
        message: "You are not authorized to perform this action",
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, status: error.status });
  }
};
module.exports.getquestionbyid = async (req, res) => {
  try {
    const { questionId } = req.params;
    const question = await Question.findById(questionId).populate({
      path: "userId",
      select: "username",
    });

    res.json({ message: "sucessful", status: true, question });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: error.message });
  }
};
module.exports.userquestions = async (req, res) => {
  try {
    const { username } = req.params;
    const posts = await User.findOne({ username })
      .select("questions")
      .populate({ path: "questions" });
    res.json({ message: "sucessful", status: true, posts });
  } catch (error) {
    console.log(error);
    res.json({ message: "sucessful", status: false, message: error.message });
  }
};
module.exports.savequestions = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (user.savedQuestions.includes(questionId)) {
      await User.findByIdAndUpdate(user, {
        $pull: { savedQuestions: questionId },
      });

      res.json({ message: "Unsaved question Successfully", status: true });
    } else {
      user.savedQuestions.unshift(questionId);
      await user.save();
      res.json({ message: "question saved sucessfully", status: true });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: error.message });
  }
};
module.exports.getsavequestions = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await User.findById(userId)
      .select("savedQuestions")
      .populate({ path: "savedQuestions" });
    res.json({ message: "sucessful", status: true, posts });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: error.message });
  }
};
module.exports.getQuestionsComments = async (req, res) => {
  try {
    const { questionId } = req.params;
    // console.log(post)
    const questions = await Question.findById(questionId)
      .populate({
        path: "answers",
        populate: { path: "author", select: "username name" },
      })
      .select("answers");

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
