const express = require('express')
const router = express.Router()
const controller = require('./controller.bulletinBoard')

router.post('/addPost', (req, res) => {
  console.log('in addpost controller')
  controller.addPost(req, res)
})

module.exports = router
