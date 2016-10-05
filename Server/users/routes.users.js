const express = require('express')
const router = express.Router()
const controller = require('./controller.users')
const passport = require('passport')

router.post('/signup', (req, res) => {
	controller.signup(req, res)
})

router.post('/login', (req, res) => {
	controller.login(req, res)
})

router.get('/login/facebook', passport.authenticate('facebook', { scope: 'email' }))

router.get('/login/facebook/callback', passport.authenticate('facebook'), (req,res) => {
	//check if the user is associated w/ a house. If so, redirect to dash, if not redirect to create/join house
	if(req.user.dataValues.house_id) {
		res.redirect('/#/dashboard')	
	} else {
		res.redirect('/#/house_select')
	}
})

router.post('/addHouseId', (req, res) => {
	controller.addHouseId(req, res)
})

router.get('/userById', (req, res) => {
	controller.userById(req, res)
})

router.get('/houseIdUsers', (req, res) => {
	controller.houseIdUsers(req, res)
})

router.get('/test', (req, res) => {
	res.status(200).send('hello users test')
})

module.exports = router
