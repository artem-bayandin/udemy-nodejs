const express = require('express')
const bodyParser = require('body-parser')

const users = []

const app = express()
app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'ejs')
app.set('views', 'views')

app.get('/', (req, res, next) => {
    res.render('index', {
        pageTitle: 'Index page'
        , path: '/'
    })
})

app.get('/users', (req, res, next) => {
    res.render('users', {
        pageTitle: 'Users'
        , users: users
        , path: '/users'
    })
})

app.post('/users', (req, res, next) => {
    const username = req.body.username
    if (username) users.push(username)
    res.redirect('/')
})

app.use('/', (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page not found'
        , path: ''
    })
})

app.listen(3000)