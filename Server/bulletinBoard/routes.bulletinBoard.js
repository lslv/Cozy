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

router.get('/getPolls', (req, res) => {
  controller.getPolls(req, res)
})

router.delete('/deletePoll', (req, res) => {
  controller.deletePoll(req, res)
})

router.post('/vote', (req, res) => {
  controller.vote(req, res)
})

router.get('/getVotes', (req, res) => {
  controller.getVotes(req, res)
})
module.exports = router
