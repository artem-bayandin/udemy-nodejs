const http = require('http')

const users = ["John", "Bob", "Michael"]

const writeMenu = res => {
    res.write(`
        <div><a href="/">home</a></div>
        <div><a href="/users">users</a></div>
        <div><a href="/other">other</a></div>
    `)
}

const wrapResponse = (res, content) => {
    res.write('<!DOCTYPE html><html><head><title>My App</title></head>')
    res.write('<body>')
    writeMenu(res)
    res.write(content)
    res.write('</body>')
    res.write('</html>')
}

const requestHandler = (req, res) => {
    const { url, method } = req

    if (url == '/' && method == 'GET') {
        const content = `<h2>hello world</h2>
        <form action="/create-user" method="POST">
            <input type="text" name="username" />
            <button type="submit">send form</button>
        </form>`
        wrapResponse(res, content)
        return res.end()
    } else if (url == '/users' && method == 'GET') {
        const usersList = users.map(user => `<li>${user}</li>`)
        const content = `<h3>users list:</h3>
        <ul>${usersList}</ul>`
        wrapResponse(res, content)
        return res.end()
    } else if (url == '/create-user' && method == 'POST') {
        const buff = []
        req.on('data', chunk => buff.push(chunk))
        req.on('end', () => {
            const username = Buffer
                .concat(buff)
                .toString()
                .split('=')[1]
            if (username.length) {
                users.push(username)
            }
            res.statusCode = 302
            res.setHeader('Location', '/users')
            return res.end();
        })
    } else {
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end();
    }
}

const server = http.createServer(requestHandler)

server.listen(3000)