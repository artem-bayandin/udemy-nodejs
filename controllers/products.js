const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    // res.send(`<form action="/admin/add-product" method="POST">
    // <input type="text" name="title" />
    // <button type="submit">add product</button>
    // </form>`)

    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))

    // pug
    // res.render('add-product', { pageTitle: 'Add Product' })
    // handlebars
    // res.render('add-product', {
    //     pageTitle: 'Add Product'
    //     , path: '/admin/add-product'
    //     , formsCSS: true
    //     , productCSS: true
    //     , activeAddProduct: true
    // })
    // ejs
    res.render('add-product', {
        pageTitle: 'Add Product'
        , path: '/admin/add-product'
    })
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/')
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop', { prods: products
            , pageTitle: 'Shop'
            , path: '/'
        })
    })
    // console.log(adminData.products)
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    
    // pug
    // res.render('shop', { prods: products, pageTitle: 'Shop' })
    // handlebars
    // res.render('shop', { prods: products
    //     , pageTitle: 'Shop'
    //     , path: '/'
    //     , hasProducts: !!products.length
    //     , activeShop: true
    //     , productCSS: true
    //  })
    // ejs
}