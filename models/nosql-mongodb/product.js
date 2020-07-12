const mongodb = require('mongodb')
const { getDb } = require('../../util/mongo-database')

class Product {
    constructor(title, price, description, imageUrl, userId, id) {
        this.title = title
        this.price = price
        this.description = description
        this.imageUrl = imageUrl
        this.userId = userId
        this._id = id ? new mongodb.ObjectID(id) : null
    }

    save() {
        let dbOp = this._id
            ? getDb()
                .collection('products')
                .updateOne({
                    _id: new mongodb.ObjectID(this._id)
                }, {
                    $set: this
                })
            : getDb()
                .collection('products')
                .insertOne(this)
        return dbOp
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    static fetchAll() {
        return getDb()
            .collection('products')
            .find()
            .toArray() // think about
            .then(products => {
                return products
            })
            .catch(err => console.log(err))
    }

    static findByPk(id) {
        return getDb()
            .collection('products')
            .find({_id: new mongodb.ObjectID(id)})
            .next()
            .then(product => {
                console.log(product)
                return product
            })
            .catch(err => console.log(err))
    }

    static deleteById(id) {
        return getDb()
            .collection('products')
            .deleteOne({_id: new mongodb.ObjectID(id)})
            .then(() => {
                console.log('deleted')
            })
            .catch(err => console.log(err))
    }
}

module.exports = Product