const express = require('express')

const router = express.Router()

const repairController = require('../controllers/repairController');

const { authorize, confirmUserAccess } = require('../middleware/authMiddleware')

// I.N.D.U.C.E.S  ->  an acronym that helps remember how to properly order routes
// Index, New, Delete, Update, Create, Edit, Show

// seed 
router.get('/seed', repairController.seed)

// index
router.get('/', repairController.index)

// delete
router.delete('/:id', authorize, confirmUserAccess, repairController.delete)

// update
router.put('/:id', authorize, confirmUserAccess, repairController.update)

// create
router.post('/', authorize, repairController.create)

// show
router.get('/:id', repairController.show)

module.exports = router;