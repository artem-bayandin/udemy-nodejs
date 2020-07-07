const db = require('../util/database')

const Cart = require('./cart')

module.exports = class Product {
    constructor(title, imageUrl, descr, price, id) {
        this.title = title
        this.imageUrl = imageUrl
        this.descr = descr
        this.price = price
        this.id = (id || new Date().getTime()).toString()
    }

    save() {
        // getProductsFromFile(products => {
        //     const productIndex = products.findIndex(item => item.id === this.id)
        //     if (productIndex >= 0) {
        //         products[productIndex] = {...this}
        //     } else {
        //         products.push(this)
        //     }
        //     saveToFile(products, err => {
        //         cb(err)
        //     })
        // })
        return db.execute('insert into products (title, price, description, imageUrl) values (?, ?, ?, ?)',
        [
            this.title, this.price, this.descr, this.imageUrl
        ])
    }

    static fetchAll() {
        // getProductsFromFile(cb)
        return db.execute('select * from products')
    }

    static findById(id) {
        // getProductsFromFile(products => {
        //     const product = products.find(item => item.id === id)
        //     cb(product)
        // })
        return db.execute('select top 1 from products where products.id = ?', [ +id ])
    }

    static deleteById(id) {
        // getProductsFromFile(products => {
        //     const filteredProducts = products.filter(item => item.id !== id)
        //     saveToFile(filteredProducts, err => {
        //         if (!err) {
        //             Cart.deleteProduct(id, err => {
        //                 cb(err)
        //             })
        //         } else {
        //             cb(err)
        //         }
        //     })
        // })
    }
}