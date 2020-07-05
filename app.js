const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))

app.use('/', (req, res, next) => {
    console.log('top level middleware before next()')
    next()
    console.log('top level middleware after next()')
})

app.get('/add-product', (req, res, next) => {
    res.send(`<form action="/product" method="POST">
    <input type="text" name="title" />
    <button type="submit">add product</button>
    </form>`)
})

app.post('/product', (req, res, next) => {
    const data = req.body
    console.log(data)
    res.redirect('/')
})

app.use('/', (req, res, next) => {
    res.send('<h1>hello</h1>')
})

app.listen(3000)