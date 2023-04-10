const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ansCommentSchema = new Schema(
  {
    body: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
    },
    answer: {
      type: Schema.Types.ObjectId,
      ref: 'Answer'
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model(' AnsComment', ansCommentSchema)
