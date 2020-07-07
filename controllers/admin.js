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
    res.render('admin/edit-product', {
        pageTitle: 'Add Product'
        , path: '/admin/add-product'
        , editing: false
        , product: null
    })
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(
        req.body.title
        , req.body.imageUrl
        , req.body.descr
        , req.body.price
    )
    product.save()
        .then(() => {
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit === 'true'
    if (!editMode) {
        return res.redirect('/')
    }
    Product.findById(req.params.productId, product => {
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product'
            , path: '/admin/edit-product'
            , editing: editMode
            , product: product
        })
    })
}

exports.postEditProduct = (req, res, next) => {
    const product = new Product(
        req.body.title
        , req.body.imageUrl
        , req.body.descr
        , req.body.price
        , req.body.productId
    )
    product.save(err => {
        res.redirect('/admin/products')
    })
}

exports.postDeleteProduct = (req, res, next) => {
    Product.deleteById(req.body.productId, err => {
        res.redirect('/admin/products')
    })
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products
            , pageTitle: 'Admin Products'
            , path: '/admin/products'
        })
    })
}