const express = require('express')
const router = express.Router()
const controller = require('./controller.chores.js')

router.post('/postChore', (req, res)=>{
	console.log('adding chore controller')
  	controller.postChore(req,res)
})

router.get('/getChores', (req, res)=>{
	console.log('getting chores controller')
  	controller.getChores(req,res)
})

router.delete('/deleteChore', (req, res)=>{
	console.log('delete chores controller')
  	controller.deleteChore(req,res)
})

router.get('/getQueue', (req, res)=>{
	console.log('get queue controller')
	controller.getQueue(req,res)
})

router.put('/updateChoreTurn', (req, res)=>{
	console.log('getting chores update turn controller')
  	controller.updateChoreTurn(req,res)
})


module.exports = router
