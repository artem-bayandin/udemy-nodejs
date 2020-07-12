const mongodb = require('mongodb')
const { getDb } = require('../../util/mongo-database')
class User {
    constructor(username, email, id, cart = { items: [] }) {
        this.username = username
        this.email = email
        this.cart = cart
        this._id = id ? new mongodb.ObjectID(id) : null
    }

    save() {
        const action = this._id
            ? getDb()
                .collection('users')
                .updadeOne({
                    _id: this._id
                }, {
                    $set: this
                })
            : getDb()
                .collection('users')
                .insertOne(this)
        return action
                .then(res => {
                    // console.log(res)
                })
                .catch(err => console.log(err))
    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(item => item.productId.toString() === product._id.toString())
        const newCart = {...this.cart, items: [...this.cart.items]}
        if (cartProductIndex < 0) {
            newCart.items.push({productId: new mongodb.ObjectID(product._id), quantity: 1})
        } else {
            newCart.items[cartProductIndex].quantity++
        }
        return getDb()
            .collection('users')
            .updateOne({
                _id: this._id
            }, {
                $set: {
                    cart: newCart
                }
            })
            .then(res => {
                //
            })
            .catch(err => console.log(err))
    }

    getCart() {
        return getDb()
            .collection('products')
            .find({
                _id: { $in: this.cart.items.map(item => { return item.productId }) }
            })
            .toArray()
            .then(products => {
                if (products.length !== this.cart.items.length) {
                    // TODO: clean up products in cart
                }
                return products.map(product => {
                    return {
                        ...product, 
                        quantity: this.cart.items.find(i => i.productId.toString() === product._id.toString()).quantity
                    }
                })
            })
            .catch(err => console.log(err))
    }

    deleteItemFromCart(id) {
        const newCart = {
            ...this.cart,
            items: this.cart.items.filter(item => item.productId.toString() !== id.toString())
        }
        return getDb()
            .collection('users')
            .updateOne({
                _id: this._id
            }, {
                $set: {
                    cart: newCart
                }
            })
            .then(res => {
                //
            })
            .catch(err => console.log(err))
    }

    addOrder() {
        return this.getCart()
            .then(products => {
                return getDb()
                    .collection('orders')
                    .insertOne({
                        user: { _id: this._id, username: this.username },
                        items: products
                    })
            })
            .then(res => {
                const newCart = { items: [] }
                this.cart = newCart
                return getDb()
                    .collection('users')
                    .updateOne({
                        _id: this._id
                    }, {
                        $set: {
                            cart: newCart
                        }
                    })
            })
            .catch(err => console.log(err))
    }

    getOrders() {
        return getDb()
            .collection('orders')
            .find({ 'user._id': this._id })
            .toArray()
            .then(orders => {
                return orders
            })
            .catch(err => console.log(err))
    }

    static findByPk(id) {
        return getDb()
            .collection('users')
            .find({
                _id: new mongodb.ObjectID(id)
            })
            .next()
            .then(user => {
                return user
            })
            .catch(err => console.log(err))
    }
}

module.exports = User