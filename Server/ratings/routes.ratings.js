const express = require('express')
const router = express.Router()
const controller = require('./controller.ratings')

router.get('/find_user', (req, res) => {
	controller.find_user(req, res)
})

router.post('/rate_user',(req, res) => {
	controller.rate_user(req, res)
})

router.put('/edit_rating',(req, res) => {
	controller.edit_rating(req, res)
})

router.delete('/delete_rating',(req, res) => {
	controller.delete_rating(req, res)
})

module.exports = router
