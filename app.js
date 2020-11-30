const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const errorController = require('./controllers/error')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')

const User = require('./models/user')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

//Middleware to find the user - for now a dummy one
app.use((req, res, next) => {
    User.findById('5fbe6627e9135d3a485fed47')
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => console.err(err))
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(authRoutes)

app.use(errorController.get404)

mongoose
    .connect('mongodb+srv://nodeJsUser:mmfgLXb3VpM90JxU@mongodbtonodejs.ierrz.gcp.mongodb.net/shop?retryWrites=true&w=majority')
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Luis',
                    email: 'email@email.com',
                    itemns: []
                });
                user.save();
            }
        })
        app.listen(3000)
    })
    .catch(err => console.log(err))