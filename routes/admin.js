const path = require('path')

const express = require('express')

const rootDir = require('../util/path')

const products = []

const router = express.Router()

// GET /admin/add-product
router.get('/add-product', (req, res, next) => {
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
})

// POST /admin/add-product
router.post('/add-product', (req, res, next) => {
    const data = req.body
    products.push({ title: req.body.title })
    console.log(data)
    res.redirect('/')
})

exports.router = router
exports.products = products