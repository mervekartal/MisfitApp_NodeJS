const express = require('express')
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash')

const pageRoute = require('./routes/pageRoute')
const trainingRoute = require('./routes/trainingRoute')
const userRoute = require('./routes/userRoute')

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


//global variable
global.userIN = null //false


//middlewares
app.use(express.static('public'))
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method',{
    methods: ['POST','GET'],
}))
app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/misfit-db' })
}))
app.use(flash())
//flash'taki mesajları flashMessages değişkenine atamak için bir middleware yaratıldı
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash()
    next()
})



//routes
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'views/index.html'))
// })

// app.get('/', (req, res) => {
//     res.render('index')
// })

app.use('*',(req, res, next) => {
    userIN = req.session.userID
    next()
})

app.use('/', pageRoute) //aynı kullanım -> app.get('/', pageRoute) 
app.use('/trainings', trainingRoute)
app.use('/users', userRoute)

const port = 3000
app.listen(port, () => {
    console.log(`App started on port ${port}`)
})