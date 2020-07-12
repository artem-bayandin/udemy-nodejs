const Product = require('../../models/product')

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
    req
        .user
        .createProduct({
            title: req.body.title
            , imageUrl: req.body.imageUrl
            , description: req.body.description
            , price: req.body.price
            , userId: req.user.id
        })
        .then(() => {
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
    // Product.create({
    //     title: req.body.title
    //     , imageUrl: req.body.imageUrl
    //     , description: req.body.description
    //     , price: req.body.price
    //     , userId: req.user.id
    // })
    // .then(() => {
    //     res.redirect('/admin/products')
    // })
    // .catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit === 'true'
    if (!editMode) {
        return res.redirect('/')
    }
    Product
        .findByPk(req.params.productId)
        .then(product => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product'
                , path: '/admin/edit-product'
                , editing: editMode
                , product: product
            })
        })
        .catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
    Product
        .findByPk(req.body.productId)
        .then(product => {
            product.title = req.body.title
            product.imageUrl = req.body.imageUrl
            product.description = req.body.description
            product.price = req.body.price
            return product.save()
        })
        .then(result => {
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
    // Product.destroy()
    Product
        .findByPk(req.body.productId)
        .then(product => {
            if (product) {
                return product.destroy()
            }
        })
        .then(result => {
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
    req
        .user
        .getProducts()
    // Product.findAll()
        .then(products => {
            res.render('admin/products', {
                prods: products
                , pageTitle: 'Admin Products'
                , path: '/admin/products'
            })
        })
        .catch(err => console.log(err))
}