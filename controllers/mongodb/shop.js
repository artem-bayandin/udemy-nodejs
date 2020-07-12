const Product = require('../../models/product')
const Cart = require('../../models/cart')
const Order = require('../../models/order')

exports.getProducts = (req, res, next) => {
    Product
        .fetchAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products
                , pageTitle: 'All Products'
                , path: '/products'
            })
        })
        .catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
    Product
        .findByPk(req.params.productId)
        .then(product => {
            res.render('shop/product-details', {
                product: product
                , pageTitle: product.title
                , path: '/products'
            })
        })
        .catch(err => console.log(err))
}

exports.getIndex = (req, res, next) => {
    Product
        .fetchAll()
        .then(products => {
            res.render('shop/index', {
                prods: products
                , pageTitle: 'Shop'
                , path: '/'
            })
        })
        .catch(err => console.log(err))
}

exports.getCart = (req, res, next) => {
    req
        .user
        .getCart()
        .then(products => {
            res.render('shop/cart', {
                pageTitle: 'Your Cart'
                , path: '/cart'
                , products: products
            })
        })
        .catch(err => console.log(err))
}

exports.postAddToCart = (req, res, next) => {
    Product
        .findByPk(req.body.productId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

exports.postRemoveFromCart = (req, res, next) => {
    req
        .user
        .deleteItemFromCart(req.body.productId)
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

exports.postOrder = (req, res, next) => {
    req
        .user
        .addOrder()
        .then(() => {
            res.redirect('/orders')
        })
        .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
    req
        .user
        .getOrders({include: ['products']})
        .then(orders => {
            res.render('shop/orders', {
                pageTitle: 'Your Orders'
                , path: '/orders'
                , orders: orders
            })
        })
        .catch(err => console.log(err))
}