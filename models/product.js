const fs = require('fs')
const path = require('path')
const rootPath = require('../util/path')

const Cart = require('./cart')

const filePath = path.join(rootPath, 'data', 'products.json')

const getProductsFromFile = cb => {
    fs.readFile(filePath, (err, data) => {
        if (err || !data || !data.byteLength) {
            cb([])
        } else {
            cb(JSON.parse(data))
        }
    })
}

const saveToFile = (data, cb) => {
    fs.writeFile(filePath, JSON.stringify(data), err => {
        cb(err)
    })
}

module.exports = class Product {
    constructor(title, imageUrl, descr, price, id) {
        this.title = title
        this.imageUrl = imageUrl
        this.descr = descr
        this.price = price
        this.id = (id || new Date().getTime()).toString()
    }

    save(cb) {
        getProductsFromFile(products => {
            const productIndex = products.findIndex(item => item.id === this.id)
            if (productIndex >= 0) {
                products[productIndex] = {...this}
            } else {
                products.push(this)
            }
            saveToFile(products, err => {
                cb(err)
            })
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(item => item.id === id)
            cb(product)
        })
    }

    static deleteById(id, cb) {
        getProductsFromFile(products => {
            const filteredProducts = products.filter(item => item.id !== id)
            saveToFile(filteredProducts, err => {
                if (!err) {
                    Cart.deleteProduct(id, err => {
                        cb(err)
                    })
                } else {
                    cb(err)
                }
            })
        })
    }
}