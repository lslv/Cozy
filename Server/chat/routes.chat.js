const express = require('express')
const router = express.Router()
const controller = require('./controller.chat')
const chalk = require('chalk')


router.post('/createRoom', (req, res)=> {
  	controller.createRoom(req,res)
})

router.get('/getUserRooms', (req, res)=> {
  	controller.getUserRooms(req,res)
})


module.exports = router