const express = require('express')
const path = require('path')
const ejs = require('ejs')


const app = express()

//template engine
app.set("view engine","ejs")

app.use(express.static('public'))



//routes
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'views/index.html'))
// })

app.get('/', (req, res) => {
    res.render('index')
})

const port = 3000
app.listen(port, () => {
    console.log(`App started on port ${port}`)
})