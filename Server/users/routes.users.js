const express = require('express')
const router = express.Router()

router.post('/signup', (req, res)=>{

})

router.post('/login', (req, res)=>{

})

router.post('/logout', (req, res)=>{

})

router.get('/test', (req, res)=>{
  res.status(200).send('hello users test')
})

module.exports = router
