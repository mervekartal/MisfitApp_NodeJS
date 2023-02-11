const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ["trainer", "member", "admin"],
        default: "trainer"
    },
    trainings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Training'

    }]

})

UserSchema.pre('save', function(next){
    const user = this
    if(!user.isModified('password')) return next() //kullanıcı pwd modifiye edilmediyse next yap

    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err)
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err)
            user.password = hash
            next()
        })
    })
})

const User = mongoose.model('User',UserSchema)
module.exports = User
