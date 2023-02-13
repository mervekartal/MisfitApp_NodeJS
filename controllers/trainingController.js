const Training = require('../models/Training')
const User = require('../models/User')

// exports.createTraining = async (req,res) => {
//     //template hazır olmadığı için json dosyası gönderildi.
//     const training = await Training.create(req.body)
//     try{
//         res.status(201).json({
//             status: 'success',
//             training: training
//         })
//     }catch(error){
//         res.status(400).json({
//             status: 'fail',
//             error
//         })
//     }
// }

exports.createTraining = async (req,res) => {
    try{
    const training = await Training.create({
        title: req.body.title,
        description: req.body.description,
        user: req.session.userID
    })
        req.flash("success",`${training.title} has been created successfully`) //flash message for create training
        res.status(201).redirect('/trainings')
    }catch(err){
        req.flash("success","Something happened!") 
        res.status(400).redirect('/trainings')
        // res.status(400).json({
        //     status: 'fail',
        //     err
        // })
    }
}


exports.getAllTrainings = async (req,res) => {
    try{
    const trainings = await Training.find({}).sort('-createdAt')
    const user = await User.findById(req.session.userID)
        res.status(200).render('trainings', {
            trainings,
            user,
            page_name: "trainings"
        })
    }catch(error){
         res.status(400).json({
         status: 'fail',
         error

        })
    }
}

exports.getTraining = async (req, res) => {
    try{
    const trainings = await Training.find()
    const training = await (await Training.findOne({slug: req.params.slug})).populate('user')
    const user = await User.findById(req.session.userID)
        res.status(200).render('training', {
            training,
            trainings,
            page_name: "training",
            user
        })
   }catch(err){
       res.status(400).json({
           status: fail,
           err
       })
   }
 }

 exports.deleteTraining = async (req,res) => {
    try{
        const training = await Training.findOneAndRemove({slug: req.params.slug})
        // req.flash("success",`${training.title} has been deleted successfully`) //flash message for delete portfolio
        res.status(200).redirect('/users/dashboard')
    }catch(err){
         res.status(400).json({
         status: 'fail',
         err
        })
    }
}

exports.updateTraining = async (req,res) => {

    try{
        const training = await Training.findOne({slug: req.params.slug})
        training.title = req.body.title
        training.description = req.body.description
        
        training.save()

        res.status(200).redirect(`/trainings/${req.params.slug}`)

    }catch(err){
         res.status(400).json({
         status: 'fail',
         err
        })
    }
}

exports.enrollTraining = async (req,res) => {

    try{
    const user = await User.findById(req.session.userID)
    await user.trainings.push({_id: req.body.training_id}) //formdan gelen antrenman id'sine sahip antrenmanı, kullanıcıya ekle
    await user.save()
        res.status(200).redirect('/users/dashboard')
    }catch(err){
         res.status(400).json({
         status: 'fail',
         err
        })
    }
}
