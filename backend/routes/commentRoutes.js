const express = require('express')

const router = express.Router()

const commentControl = require('../controllers/commentController')

const { authorize, confirmUserAccess } = require('../middleware/authMiddleware')

// "/:pid/" is the URL Param for the id of the post that the comment is related to
router.post('/p/:pid/', authorize, commentControl.createComment)

//for repairs
router.post('/r/:pid/', authorize, commentControl.createCommentforRepair)

// "/c/" stands for comment followed by that comment's id
router.delete('/p/:pid/c/:id', authorize, confirmUserAccess, commentControl.deleteComment)

//for repairs
// "/c/" stands for comment followed by that comment's id
router.delete('/r/:pid/c/:id', authorize, confirmUserAccess, commentControl.deleteCommentforRepair)

router.get('/p/:pid/', commentControl.indexComment)

//for repair
router.get('/r/:pid/', commentControl.indexCommentforRepair)

router.get('/p/:pid/c/:id', commentControl.showComment)

//for repair
router.get('/r/:pid/c/:id', commentControl.showComment)

router.put('/p/:pid/c/:id', authorize, confirmUserAccess, commentControl.updateComment)

//for repair
router.put('/r/:pid/c/:id', authorize, confirmUserAccess, commentControl.updateComment)

//general comments update
router.put('/c/:id', authorize, confirmUserAccess, commentControl.updateComment)

module.exports = router