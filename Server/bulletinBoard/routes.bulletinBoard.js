const express = require('express')
const router = express.Router()
const controller = require('./controller.bulletinBoard')

// Posts

router.post('/addPost', (req, res) => {
  console.log('in addpost controller')
  controller.addPost(req, res)
})

router.get('/getPosts', (req, res) => {
  console.log('in getPosts controller')
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
  console.log('in add poll')
  controller.addPoll(req, res)
})

module.exports = router
