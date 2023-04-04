const Repairs = require('../models/RepairModel')
const Comments = require('../models/commentModel')
// const repairs = require('../models/repairs')

module.exports.seed = async (req, res) => {
    // await Repairs.deleteMany({})
    // await Repairs.create(repairs)
    res.redirect('/repairs')
}

module.exports.index = async (req, res) => {
    try {
        const repairs = await Repairs.find().sort({ createdAt: 1 })
        res.status(200).json(repairs)
    }
    catch(err) {
        res.status(400).json({ error: err.message })
    }   
    // res.render('repairs/Index', { repairs })
    // res.send('Welcome to the Bulding Mainenance Logs')
}

module.exports.new = async (req, res) => {
    res.render('repairs/New')
}

module.exports.delete = async (req, res) => {
    try {
        // first find the repairItem, store it in a variable, then delete it from database
    const repairItem = await Repairs.findByIdAndDelete(req.params.id)
    // delete all comments where the comment id 
    await Comments.deleteMany({ _id: { 
        // equals/matches any comment ids in this array
        $in: repairItem.comments 
    }})
    res.status(200).json({ message: 'deleted successfully' })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
    
    // res.redirect('/repairs')
}

module.exports.update = async (req, res) => {
    try {
        const updatedRepair = await Repairs.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedRepair)

    } catch(err) {
        res.status(400).json({ error: err.message })
    }
    // await Repairs.findByIdAndUpdate(req.params.id, req.body)
    // res.redirect(`/repairs/${req.params.id}`)
}

module.exports.create = async (req, res) => {
    console.log(req.body)
    try {
        const repairItem = await Repairs.create(req.body)
        res.status(200).json(repairItem)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

// module.exports.edit = async (req, res) => {
//     const post = await Repairs.findById(req.params.id)
//     console.log(post)
//     console.log('edit route')
//     res.render('repairs/Edit', { post })
// }

module.exports.show = async (req, res) => {
    try {
        // populate replaces the ids with actual documents/objects we can use
        const repairItem = await Repairs.findById(req.params.id).populate('comments')
        res.status(200).json(repairItem)
    } catch(err) {
        res.status(404).json({ error: err.message })
    }
}


