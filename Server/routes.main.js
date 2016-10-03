const express = require('express')
const chalk = require('chalk')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = express.Router()

// route files
const billing = require('./billing/routes.billing')
const bulletinBoard = require('./bulletinBoard/routes.bulletinBoard')
const chores = require('./chores/routes.chores')
const users = require('./users/routes.users')
const houses = require('./houses/routes.houses.js')
const chat = require('./chat/routes.chat')

// middleware
router.use(morgan('combined'))
router.use(cors())
router.use(bodyParser())

// loggs url to console on request
router.use('/*', (req, res, next) => {
	console.log(chalk.blue(`Request Url: ${req.url}`))
	next()
})

// routes
router.use('/', express.static('public'))
router.use('/api/billing', billing)
router.use('/api/bulletinBoard', bulletinBoard)
router.use('/api/chores', chores)
router.use('/api/users', users)
router.use('/api/houses', houses)
router.use('/api/chat', chat)

router.use((req, res) => {
	res.status(404).send('Sorry that does not exist')
})

module.exports = router
