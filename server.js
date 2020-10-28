const express = require('express')
const server = express()
const blogRouter = require('./blogRouter')

server.use(express.json())
server.use(blogRouter)

server.get('/', (req,res) => {
    res.send(`<h2>Hello World</h2>`)
})

module.exports = server