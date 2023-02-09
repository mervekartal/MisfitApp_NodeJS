const express = require('express')
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')

const pageController = require('./controllers/pageController')
const trainingController = require('./controllers/trainingController')

const app = express()


//connect db
mongoose.set('strictQuery', false)

mongoose.connect('mongodb://localhost/misfit-db').then(() => {
    console.log('DB Connection Successful')
}).catch((err) => {
    console.log(err)
})

process.on('warning', (warning) => {
    console.log(warning.stack);
})


//template engine
app.set("view engine","ejs")

app.use(express.static('public'))
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))



//routes
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'views/index.html'))
// })

// app.get('/', (req, res) => {
//     res.render('index')
// })
app.get('/', pageController.getIndexPage) //home
app.get('/about', pageController.getAboutPage) //about
app.get('/trainer', pageController.getTrainerPage) //trainer
app.get('/contact', pageController.getContactPage) //contact
app.get('/gallery', pageController.getGalleryPage) //gallery
app.get('/register', pageController.getRegisterPage) //register
app.get('/login', pageController.getLoginPage) //login
// app.get('/trainings', pageController.getTrainingsPage) //all trainings

app.post('/trainings', trainingController.createTraining) //add training - post operation
app.get('/trainings', trainingController.getAllTrainings) //all trainings
app.get('/trainings/:slug', trainingController.getTraining) //training's single page



const port = 3000
app.listen(port, () => {
    console.log(`App started on port ${port}`)
})