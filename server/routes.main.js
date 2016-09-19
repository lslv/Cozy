const express = require('express')
const chalk = require('chalk')
const router = express.Router()

//route files
const billing = require('./billing/routes.billing')
const bulletinBoard = require('./bulletinBoard/routes.bulletinBoard')
const chores = require('./chores/routes.chores')
const users = require('./users/routes.users')

//loggs url to console on request
router.get('/*', (req, res, next)=>{
  console.log(chalk.blue(`Request Url: ${req.url}`))
  next()
})

//routes
router.use('/', express.static('public'))
router.use('/api/billing', billing)
router.use('/api/bulletinBoard', bulletinBoard)
router.use('/api/chores', chores)
router.use('/api/users', users)

module.exports = router
