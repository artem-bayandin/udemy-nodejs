const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const expressHbs = require('express-handlebars')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const rootDir = require('./util/path')

const app = express()

app.engine('my_handlebars', expressHbs({
    layoutsDir: 'views/layouts'
    , defaultLayout: 'main-layout'
    , extname: 'my_hbs' // only for defaultLayout template
}))
// app.set('view engine', 'pug')
app.set('view engine', 'my_handlebars') // name is the same as template file extension
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', (req, res, next) => {
    console.log('top level middleware before next()')
    next()
    console.log('top level middleware after next()')
})

app.use('/admin', adminData.router)
app.use(shopRoutes)

app.use('/', (req, res, next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
    res.status(404).render('404', { pageTitle: 'Page not found' })
})

app.listen(3000)