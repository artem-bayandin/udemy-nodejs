const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
// const expressHbs = require('express-handlebars')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const rootDir = require('./util/path')
const errorController = require('./controllers/error')

const sequelize = require('./util/database')

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
    // console.log('top level middleware before next()')
    next()
    // console.log('top level middleware after next()')
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use('/', errorController.get404)

sequelize.sync()
    .then(result => {
        console.log(result)
        app.listen(3000)
    })
    .catch(err => console.log(err))

