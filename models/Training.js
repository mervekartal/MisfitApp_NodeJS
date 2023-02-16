const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slugify = require('slugify')

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
    },
    user: { //oluşturan 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: { //ait olduğu kategori 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
})

TrainingSchema.pre('validate', function(next){
    this.slug = slugify(this.title, {
        lower: true,
        strict: true
    })
    next()
})

const Training = mongoose.model('Training',TrainingSchema)
module.exports = Training
