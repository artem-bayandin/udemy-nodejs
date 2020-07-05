const express = require('express')

const app = express()

app.use('/users', (req, res, next) => {
    res.send('<h1>users page</h1>')
})

app.use('/', (req, res, next) => {
    res.send('<h1>index page</h1>')
})

// app.use((req, res, next) => {
//     console.log('one')
//     next()
//     console.log('four')
// })

// app.use((req, res, next) => {
//     console.log('two')
//     res.send('<h1>hello</h1>')
//     console.log('three')
// })

app.listen(3000)