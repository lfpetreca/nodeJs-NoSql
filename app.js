const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const errorController = require('./controllers/error')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const mongoConnect = require('./utils/database').mongoConnect
const User = require('./models/user')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

//Middleware to find the user - for now a dummy one
app.use((req, res, next) => {
    User.findById('5efe107eaaa7885bdb90b876')
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => console.err(err))
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

mongoConnect(() => {
    app.listen(3000)
})
