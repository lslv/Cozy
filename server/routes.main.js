const express = require('express')
const router = express.Router()

const billing = require('./billing/routes.billing')
const bulletinBoard = require('./bulletinBoard/routes.bulletinBoard')
const chores = require('./chores/routes.chores')
const users = require('./users/routes.users')

//loggs route to console
router.get('/*', (req, res, next)=>{
  console.log(`Request Url: ${req.url}`)
  next()
})

router.use('/', express.static('public'))

router.use('/api/billing', billing)
router.use('/api/bulletinBoard', bulletinBoard)
router.use('/api/chores', chores)
router.use('/api/users', users)

module.exports = router
