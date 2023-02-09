const Training = require('../models/Training')

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

exports.createTraining = async (req, res) => {  
    try{
        const training = await Training.create(req.body)
        res.status(201).redirect('/trainings')      
    }catch(error){
        res.status(400).json({
            status: 'fail',
            error    
        })
    }
}

exports.getAllTrainings = async (req,res) => {
    try{
    const trainings = await Training.find({}).sort('-createdAt')
        res.status(200).render('trainings', {
            trainings,
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
    const training = await Training.findOne({slug: req.params.slug})
    res.status(200).render('training',{
     training,
     page_name: "trainings"
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
        res.status(200).redirect('/trainings')
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
