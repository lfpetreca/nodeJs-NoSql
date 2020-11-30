const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        isAuthenticated: req.isLoggedIn
    })
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        userId: req.user
    })
    product.save()
        .then(() => res.redirect('/admin/products'))
        .catch(err => console.error(err))
}

exports.getEditProduct = (req, res, next) => {
    if (!req.query.edit) {
        return res.redirect('/')
    }
    Product.findById(req.params.productId)
        .then(product => {
            if (!product) {
                return res.redirect('/')
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: req.query.edit,
                product: product,
                isAuthenticated: req.isLoggedIn
            })
        })
        .catch(err => console.error(err))
}

exports.postEditProduct = (req, res, next) => {
    Product.findById(rereq.body.productId)
        .then(product => {
            product.title = req.body.title
            product.price = req.body.price
            product.imageUrl = req.body.imageUrl
            product.description = req.body.description
            return product.save()
        })
        .then(() => res.redirect('/admin/products'))
        .catch(err => console.error(err))
}

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(product => {
            res.render('admin/products', {
                prods: product,
                pageTitle: 'Admin Products',
                path: '/admin/products',
                isAuthenticated: req.isLoggedIn
            })
        })
        .catch(err => console.err(err))
}

exports.postDeleteProduct = (req, res, next) => {
    Product.findByIdAndDelete(req.body.productId)
        .then(() => res.redirect('/admin/products'))
        .catch(err => console.error(err))
}