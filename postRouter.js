const express = require('express')
const db = require('./data/db')
const router = express.Router()

router.get('/api/posts', (req, res) => {
    db.find(req.query)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "The posts information could not be retrieved."
        })
    })
})

router.get('/api/posts/:id', (req, res) => {
    const { id } = req.params
    db.findById(id)
    .then(data => {
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch(error => {
        
        res.status(500).json({
            message: error.message
        })
    })
})

router.get('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params
    db.findPostComments(id)
    .then(data => {
        if (!data.length) {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        } else {
            res.status(200).json(data)
        }
    })
    .catch(error => {
        res.status(500).json({
            message: error.message
        })
    })
})

router.post('/api/posts', (req, res) => {
    if(!req.body.title || !req.body.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post."
        })
    } else {
        db.insert(req.body)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => {
            res.status(500).json({
                message: "There was an error while saving the post to the database"
            })
        })
    }
})

router.post('/api/posts/:id/comments', (req, res) => {
    const newComment = { post_id: req.params.id, ...req.body }
    db.insertComment(newComment)
    .then(data => {
        res.status(201).json(data)
    })
    .catch(error => {
        res.status(500).json({
            message: error.message,
            stack: error.stack
        })
    })
    
})

router.put('/api/posts/:id', (req, res) => {
    const changes = req.body
    db.update(req.params.id, changes)
    .then(data => {
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            message: error.message
        })
    })
})

router.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params
    db.remove(id)
    .then(data => {
        if(data > 0) {
            res.status(200).json({
                message: "Post has been deleted"
            })
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
})




module.exports = router