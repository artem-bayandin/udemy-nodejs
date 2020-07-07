const Product = require('../models/product')
const Cart = require('../models/cart')

// exports.getProducts = (req, res, next) => {
//     Product.fetchAll(products => {
//         res.render('shop/product-list', {
//             prods: products
//             , pageTitle: 'All Products'
//             , path: '/products'
//         })
//     })
//     // console.log(adminData.products)
//     // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
//     // pug
//     // res.render('shop', { prods: products, pageTitle: 'Shop' })
//     // handlebars
//     // res.render('shop', { prods: products
//     //     , pageTitle: 'Shop'
//     //     , path: '/'
//     //     , hasProducts: !!products.length
//     //     , activeShop: true
//     //     , productCSS: true
//     //  })
//     // ejs
// }

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows]) => {
            res.render('shop/product-list', {
                prods: rows
                , pageTitle: 'All Products'
                , path: '/products'
            })
        })
        .catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
    Product.findById(req.params.productId)
        .then(([rows]) => {
            res.render('shop/product-details', {
                product: rows[0]
                , pageTitle: product.title
                , path: '/products'
            })
        })
        .catch(err => console.log(err))
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows]) => {
            res.render('shop/index', {
                prods: rows
                , pageTitle: 'Shop'
                , path: '/'
            })
        })
        .catch(err => console.log(err))
}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const data = cart && cart.products && cart.products.length
                ? cart.products.map(cartItem => {
                    const product = products.find(item => item.id === cartItem.id)
                    return {
                        ...product,
                        qty: cartItem.qty
                    }
                })
                : []
            res.render('shop/cart', {
                pageTitle: 'Your Cart'
                , path: '/cart'
                , products: data
            })
        })
    })
}

exports.postAddToCart = (req, res, next) => {
    Product.findById(req.body.productId, product => {
        Cart.addProduct(product.id, product.price, err => {
            res.redirect('/cart')
        })
    })
}

exports.postRemoveFromCart = (req, res, next) => {
    Cart.deleteProduct(req.body.productId, err => {
        res.redirect('/cart')
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders'
        , path: '/orders'
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout'
        , path: '/checkout'
    })
}