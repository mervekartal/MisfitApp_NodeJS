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

exports.sendEmail = async (req,res) => {
    try{
    const outputMessage = `
    <h3>Mail Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.mail}</li>
    </ul>  
    <h4>Subject: </h4>
    ${req.body.subject}
    <h4>Message</h4>  
    <p>${req.body.message}</p>
    `

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'username',
            pass: 'password'
        }      
    })
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Misfit Contact Form" <email>', // sender address
        to: "johndoe@mail.com", // list of receivers
        subject: "Misfit Contact New Message ✔", // Subject line
        html: outputMessage, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))

      req.flash("success","We received your message successfully") //2 params

      res.status(200).redirect('/contact')

    }catch(err){
        // req.flash("error",`Something happend! ${err}`)
        req.flash("error","Something happend!")
        res.status(502).redirect('/contact')

    }
}
