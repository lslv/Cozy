const express = require('express')
const router = express.Router()

router.post('/signup', (req, res)=>{

})

router.post('/login' (req, res)=>{
  
})

router.get('/test', (req, res)=>{
  res.send(200, 'hello users test')
})

module.exports = router
