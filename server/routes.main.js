const express = require('express')
const chalk = require('chalk')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = express.Router()


//route files
const billing = require('./billing/routes.billing')
const bulletinBoard = require('./bulletinBoard/routes.bulletinBoard')
const chores = require('./chores/routes.chores')
const users = require('./users/routes.users')

//middleware
router.use(morgan('combined'))
router.use(cors())

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

router.use((req, res, next)=>{
  res.status(404).send('Sorry that does not exist')
})

module.exports = router
