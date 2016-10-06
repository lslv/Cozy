const express = require('express')
const router = express.Router()
const controller = require('./controller.billing')

router.get('/test', (req, res) => {
	res.status(200).send('hello billing test')
})

router.get('/getBills', (req, res) => {
	controller.getBills(req, res)
})
module.exports = router
