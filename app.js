const http = require('http')
const express = require('express')

const app = express()

app.use((req, res, next) => {
    console.log('one')
    next()
    console.log('two')
})

app.use((req, res, next) => {
    console.log('three')
    res.send('<h2>hello</h2>')
    console.log('four')
})

const server = http.createServer(app)

server.listen(3000)