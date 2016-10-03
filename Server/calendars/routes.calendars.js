const express = require('express')
const router = express.Router()
const controller = require('./controller.calendars.js')

router.post('/addCalendar', (req, res)=>{
	console.log('adding calendendar controller')
	controller.addCalendar(req,res)
})


module.exports = router
