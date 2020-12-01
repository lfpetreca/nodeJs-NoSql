exports.getLogin = (req, res, next) => {
    const isLoggedIn = req.get('Cookie')
        .split(';')[1]
        .trim()
        .split('=')[1]
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: isLoggedIn
    })
}

exports.postLogin = (req, res, next) => {
    User.findById('5fbe6627e9135d3a485fed47')
        .then(user => {
            req.session.isLoggedIn = true
            req.session.user = user
            req.session.save(() => {
                res.redirect('/')
            })
        }).catch(err => console.log(err))
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}