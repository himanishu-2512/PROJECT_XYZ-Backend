const {
  newComment,
  updateComment,
  deleteComment,
  newAnsComment,
  updateAnsComment,
  deleteAnsComment,
} = require('../controllers/commentController')

const router = require('express').Router()

//postcomments Routes
router.post('/post/:postId/:userId/newcomment', newComment)
router.post('/post/:postId/:userId/:commentId/updatecomment', updateComment)
router.post('/post/:postId/:userId/:commentId/deletecomment', deleteComment)

//ansComments Routes
router.post('/ans/:questionId/:userId/:answerId/newanscomment', newAnsComment)
router.post(
  '/ans/:questionId/:userId/:answerId/:commentId/updateanscomment',
  updateAnsComment
)
router.post('/ans/:questionId/:userId/:answerId/:commentId/deleteanscomment', deleteAnsComment)

module.exports = router
