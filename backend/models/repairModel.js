const mongoose = require('mongoose')

const Schema = mongoose.Schema

const repairsSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    user: { type: String, default: 'Bob' },
    description: {
        type: String, 
        required: true
    },
    image: { type: String},
    type: {
        type: String,
        required: true
      //   enum: ['Plumbing', 'Electrical', 'Roof','Wear-Tear','Exterior', 'misc']
    },
    comments: [{
        // an id referencing the comment
        type: mongoose.Types.ObjectId,
        // search for it in the Comments collection
        ref: 'Comment'
     }],
     fixed: { type: Boolean, default: false }
},{ timestamps: true })

const Repairs = mongoose.model('repairlog', repairsSchema)

module.exports = Repairs