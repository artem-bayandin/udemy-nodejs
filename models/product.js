const fs = require('fs')
const path = require('path')
const rootPath = require('../util/path')

const productsFilePath = path.join(rootPath, 'data', 'products.json')

const getProductsFromFile = cb => {
    fs.readFile(productsFilePath, (err, data) => {
        if (err || !data || !data.byteLength) {
            cb([])
        } else {
            cb(JSON.parse(data))
        }
    })
}

module.exports = class Product {
    constructor(title) {
        this.title = title
    }

    save() {
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(productsFilePath, JSON.stringify(products), err => {
                console.log(err)
            })
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }
}