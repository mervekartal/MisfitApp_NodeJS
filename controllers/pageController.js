const nodemailer = require('nodemailer')
const Training = require('../models/Training')
const User = require('../models/User')
const Category = require('../models/Category')


// exports.getIndexPage = (req,res) => {
//     res.status(200).render('index',{
//         page_name: "index"
//     })
// }

exports.getIndexPage = async (req,res) => {
    const trainings = await Training.find().sort('-createdAt')
    const totalTrainings = await Training.find().countDocuments()
    const totalTrainers = await User.countDocuments({role: 'trainer'})
    const totalMembers = await User.countDocuments({role: 'member'})
    res.status(200).render('index',{
        page_name: "index",
        trainings,
        totalTrainings,
        totalTrainers,
        totalMembers
    })
}


exports.getAboutPage = (req,res) => {
    res.status(200).render('about',{
        page_name: "about"
    })
}

exports.getContactPage = (req,res) => {
    res.status(200).render('contact',{
        page_name: "contact"
    })
}

exports.getLoginPage = (req,res) => {
    res.status(200).render('login',{
        page_name: "login"
    })
}

exports.getLogoutPage = (req,res) => {
    res.status(200).render('logout',{
        page_name: "logout"
    })
}

exports.getRegisterPage = (req,res) => {
    res.status(200).render('register',{
        page_name: "register"
    })
}

exports.getCategoriesPage = (req,res) => {
    res.status(200).render('categories',{
        page_name: "categories"
    })
}

