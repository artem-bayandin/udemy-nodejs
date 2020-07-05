const path = require('path')

const express = require('express')

const app = express()
const rootDir = path.dirname(process.mainModule.filename)

const router = express.Router()
router.get('/users', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'users.html'))
})
router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'home.html'))
})

app.use(express.static('public'))

app.use(router)

app.use('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', '404.html'))
})

app.listen(3000)