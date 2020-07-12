const Product = require('../../models/product')
const Cart = require('../../models/cart')
const Order = require('../../models/order')

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
    Product
        .findAll()
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
        .findAll()
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
        .then(cart => {
            return cart.getProducts()
        })
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
    Promise
        .all([
            req.user.getCart()
            , Product.findByPk(req.body.productId)
        ])
        .then(([cart, product]) => {
            return Promise.all([
                cart
                , product
                , cart.getProducts({where: { id: product.id }})
            ])
        })
        .then(([cart, product, cartProducts]) => {
            console.log('ADD_TO_CART', cart, product, cartProducts)
            const quantity = cartProducts.length
                ? cartProducts[0].cartItem.quantity + 1
                : 1
            return cart.addProduct(product, { through: { quantity: quantity } })
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

exports.postRemoveFromCart = (req, res, next) => {
    req
        .user
        .getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: req.body.productId}})
        })
        .then(cartProducts => {
            return cartProducts[0].cartItem.destroy()
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

exports.postOrder = (req, res, next) => {
    let fetchedCart = null
    req
        .user
        .getCart()
        .then(cart => {
            fetchedCart = cart
            return Promise.all([cart.getProducts(), req.user.createOrder()])
        })
        .then(([cartProducts, order]) => {
            return Promise.all([order.addProducts(cartProducts.map(product => {
                product.orderItem = { quantity: product.cartItem.quantity }
                return product
            })), fetchedCart.setProducts(null)])
        })
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