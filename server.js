const express = require('express')
const server = express()
const postRouter = require('./postRouter')

server.use(express.json())
server.use(postRouter)

server.get('/', (req,res) => {
    res.send(`<h2>Hello World</h2>`)
})

module.exports = server