const Training = require('../models/Training')

exports.createTraining = async (req,res) => {
    //template hazır olmadığı için json dosyası gönderildi.
    const training = await Training.create(req.body)
    try{
        res.status(201).json({
            status: 'success',
            training: training
        })
    }catch(error){
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}
