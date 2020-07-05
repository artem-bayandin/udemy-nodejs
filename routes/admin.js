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
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
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