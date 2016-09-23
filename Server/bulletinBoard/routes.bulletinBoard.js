const express = require('express')
const router = express.Router()
const controller = require('./controller.bulletinBoard')

// Posts

router.post('/addPost', (req, res) => {
  controller.addPost(req, res)
})

router.get('/getPosts', (req, res) => {
  controller.getPosts(req, res)
})

router.delete('/deletePost', (req, res) => {
  controller.deletePost(req, res)
})

router.put('/editPost', (req, res) => {
  controller.editPost(req, res)
})

// Polls

router.post('/addPoll', (req, res) => {
  controller.addPoll(req, res)
})

router.get('/getPoll/:pollId', (req, res) => {
  controller.getPoll(req, res)
})

module.exports = router
