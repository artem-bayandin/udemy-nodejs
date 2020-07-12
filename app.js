const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
// const expressHbs = require('express-handlebars')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')

const PORT = 3000

/* SEQUELIZE imports */
/*
const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')
*/

/* MongoDB */
const { mongoConnect } = require('./util/mongo-database')
const User = require('./models/user')

const app = express()

// app.set('view engine', 'pug')

// app.engine('my_handlebars', expressHbs({
//     layoutsDir: 'views/layouts'
//     , defaultLayout: 'main-layout'
//     , extname: 'my_hbs' // only for defaultLayout template
// }))
// app.set('view engine', 'my_handlebars') // name is the same as template file extension

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', (req, res, next) => {
    User
        .findByPk('5f0b44e28910b51e0cbbbde3')
        .then(user => {
            req.user = new User(user.username, user.email, user._id, user.cart)
            next()
        })
        .catch(err => console.log(err))
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use('/', errorController.get404)

/* SEQUELIZE relations */
/*
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product) // not necessary

User.hasOne(Cart)
Cart.belongsTo(User) // not necessary
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem })
Product.belongsToMany(Order, { through: OrderItem })
*/

/* SEQUELIZE init app */
/*
sequelize
    // .sync({force: true}) // not for production
    .sync()
    .then(result => {
        return User.findByPk(1)
        
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Test User', email: 'test@user.com' })
        }
        // return Promise.resolve(user)
        return user
    })
    .then(user => {
        return user.createCart()
    })
    .then(user => {
        app.listen(3000)
    })
    .catch(err => console.log(err))
*/

mongoConnect(client => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
})