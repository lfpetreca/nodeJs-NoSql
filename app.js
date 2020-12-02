const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDbStore = require('connect-mongodb-session')(session)

const errorController = require('./controllers/error')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')
const User = require('./models/user')

const MONGO_URI = 'mongodb+srv://nodeJsUser:mmfgLXb3VpM90JxU@mongodbtonodejs.ierrz.gcp.mongodb.net/shop'

const app = express()
const store = new MongoDbStore({ uri: MONGO_URI, collection: 'sessions' })

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: '$4LTk&Y', resave: false, saveUninitialized: false, store: store }))

app.use((req, res, next) => {
    if (!req.session.user) {
        return next()
    }
    User.findById(req.session.user._id)
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

mongoose.connect(MONGO_URI)
    .then(() => app.listen(3000))
    .catch(err => console.log(err))
