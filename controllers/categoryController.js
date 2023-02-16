const Category = require('../models/Category')
const User = require('../models/User')


exports.createCategory = async (req, res) => {
    try{
    const category = await Category.create({
        name: req.body.name
    })
        req.flash("success",`${category.name} has been created successfully`) //flash message for create category
        res.status(201).redirect('/categories')
    }catch(err){
        req.flash("fail","Something happened!") 
        res.status(400).redirect('/categories')
        
    }
}

exports.getAllCategories = async (req,res) => {
    try{
    const categories = await Category.find({}).sort('-createdAt')
    const user = await User.findById(req.session.userID)
        res.status(200).render('categories', {
            categories,
            user,
            page_name: "categories"
        })
    }catch(error){
         res.status(400).json({
         status: 'fail',
         error

        })
    }
}
