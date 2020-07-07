const fs = require('fs')
const path = require('path')
const rootPath = require('../util/path')

const filePath = path.join(rootPath, 'data', 'cart.json')

const getCartFromFile = cb => {
    fs.readFile(filePath, (err, data) => {
        if (err || !data || !data.byteLength) {
            cb({ products: [], totalPrice: 0 })
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

module.exports = class Cart {
    static addProduct(id, price, cb) {
        price = +price
        getCartFromFile(cart => {
            let existingProductIndex = cart.products.findIndex(item => item.id === id)
            if (existingProductIndex >= 0) {
                cart.products[existingProductIndex].qty++
            } else {
                const lineItem = {
                    id,
                    price,
                    qty: 1
                }
                cart.products.push(lineItem)
            }
            cart.totalPrice = +cart.products.reduce((accum, current) => {
                return accum + current.price * current.qty
            }, 0).toFixed(2)
            saveToFile(cart, err => {
                cb(err)
            })
        })
    }

    static decreaseProduct(id, cb) {
        getCartFromFile(cart => {
            let existingProductIndex = cart.products.findIndex(item => item.id === id)
            if (existingProductIndex < 0) {
                cb(null)
                return
            }
            cart.products[existingProductIndex].qty--
            if (cart.products[existingProductIndex].qty < 1) {
                cart.products.splice(existingProductIndex, 1)
            }
            cart.totalPrice = +cart.products.reduce((accum, current) => {
                return accum + current.price * current.qty
            }, 0).toFixed(2)
            saveToFile(cart, err => {
                cb(err)
            })
        })
    }

    static deleteProduct(id, cb) {
        getCartFromFile(cart => {
            let existingProductIndex = cart.products.findIndex(item => item.id === id)
            if (existingProductIndex < 0) {
                cb(null)
                return
            }
            cart.products.splice(existingProductIndex, 1)
            cart.totalPrice = +cart.products.reduce((accum, current) => {
                return accum + current.price * current.qty
            }, 0).toFixed(2)
            saveToFile(cart, err => {
                cb(err)
            })
        })
    }

    static getCart(cb) {
        getCartFromFile(cart => {
            if (!cart || !cart.products.length) {
                cb(null)
            } else {
                cb(cart)
            }
        })
    }
}