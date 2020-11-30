const Product = require('../models/product')
const Order = require('../models/order')

exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
                isAuthenticated: req.isLoggedIn
            })
        })
        .catch(err => console.err(err))
}

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',
                isAuthenticated: req.isLoggedIn
            })
        })
        .catch(err => console.err(err))
}

exports.getProduct = (req, res, next) => {
    Product.findById(req.params.productId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products',
                isAuthenticated: req.isLoggedIn
            })
        })
        .catch(err => console.error(err))
}

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products: products,
                isAuthenticated: req.isLoggedIn
            })
        })
        .catch(err => console.error(err))
}

exports.postCart = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => console.error(err))
}

exports.postCartDeleteProduct = (req, res, next) => {
    req.user.removeFromCart(req.body.productId)
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => console.error(err))
}

exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items
                .map(i => {
                    return { quantity: i.quantity, product: { ...i.productId._doc } }
                })
            const order = new Order({
                user: { userId: req.user, name: req.user.name },
                products: products
            })
            return order.save()
        })
        .then(() => req.user.clearCart())
        .then(() => res.redirect('/orders'))
        .catch(err => console.error(err))
}

exports.getOrders = (req, res, next) => {
    Order.find({ "user.userId": req.user._id })
        .then(orders => {
            res.render('shop/orders', {
                pageTitle: 'Your orders',
                path: '/orders',
                orders: orders,
                isAuthenticated: req.isLoggedIn
            })
        })
        .catch(err => console.error(err))
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
        isAuthenticated: req.isLoggedIn
    })
}