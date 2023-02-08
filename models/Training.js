const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TrainingSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        unique: true
    }

})

const Training = mongoose.model('Training',TrainingSchema)
module.exports = Training
