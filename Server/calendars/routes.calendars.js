const express = require('express')
const router = express.Router()
const controller = require('./controller.calendars.js')

router.post('/addCalendar', (req, res)=>{
	console.log('adding calendar controller')
	controller.addCalendar(req,res)
})

router.get('/getCalendar', (req, res)=> {
	console.log('getting a calendar controller')
	controller.getCalendar(req, res)
})

module.exports = router
