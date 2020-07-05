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

app.listen(3000)