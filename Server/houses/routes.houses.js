const express = require('express')
const router = express.Router()
const controller = require('./controller.houses')

router.get('/search', (req, res) => {
	controller.search(req, res)
})

router.post('/addHouse', (req, res) => {
	controller.addHouse(req, res)
})
module.exports = router
