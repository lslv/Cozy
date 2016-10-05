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


// router.post('/logout', (req, res) => {
//
// })

router.get('/login/facebook', passport.authenticate('facebook', { scope: 'email' }))

router.get('/login/facebook/callback', passport.authenticate('facebook', { successRedirect: '/#/dashboard', failureRedirect: '/#/login' }))

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
