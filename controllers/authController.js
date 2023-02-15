const bcrypt = require('bcrypt')
const User = require('../models/User')
const Training = require('../models/Training')
const { validationResult } = require('express-validator')

exports.createUser = async (req,res) => {
    try{
        const user = await User.create(req.body)
        res.status(201).redirect('/login')
    }catch(error){
        // res.status(400).json({
        //     status: 'fail',
        //     error
        // })
        const errors = validationResult(req)
        console.log(errors)
        console.log(errors.array()[0].msg)
        res.status(400).redirect('/register')

    }
}

exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email })
      if (user) {
        bcrypt.compare(password, user.password, (error, same) => {
          if (same) {
            // USER SESSION
            req.session.userID = user._id;
            res.status(200).redirect('/users/dashboard');
          } else {
            req.flash('error', 'Your email or password is  incorrect!');
            res.status(400).redirect('/login');
          }
        })
      } else {
        req.flash('error', 'User is not exist!');
        res.status(400).redirect('/login');
      }
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
}

exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}

exports.getDashboardPage = async (req,res) => {
    const user = await (await User.findOne({_id: req.session.userID})).populate('trainings')
    const trainings = await Training.find({user: req.session.userID})
    const users = await User.find()
    res.status(200).render('dashboard',{
        page_name: "dashboard",
        user,
        trainings,
        users
    })
}

exports.deleteUser = async (req,res) => {

  try{
      await User.findByIdAndRemove(req.params.id)

      await Training.deleteMany({user: req.params.id}) //trainer rolündeki kullanıcı silindiğinde, o kullanıcıya ait antrenmanları da sil

      res.status(200).redirect('/users/dashboard')
  }catch(err){
       res.status(400).json({
       status: 'fail',
       err
      })
  }
}
