const Product = require('../../models/product')

exports.getAddProduct = (req, res, next) => {
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
        , req.body.price
        , req.body.description
        , req.body.imageUrl
        , req.user._id
    )
    product
        .save()
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
    const product = new Product(
        req.body.title
        , req.body.price
        , req.body.description
        , req.body.imageUrl
        , req.user._id
        , req.body.productId
    )
    product
        .save()
        .then(result => {
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
    Product
        .deleteById(req.body.productId)
        .then(result => {
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
    Product
        .fetchAll()
        .then(products => {
            res.render('admin/products', {
                prods: products
                , pageTitle: 'Admin Products'
                , path: '/admin/products'
            })
        })
        .catch(err => console.log(err))
}