const express = require('express')
const router = express.Router()

router.get('/test', (req, res)=>{
  res.send(200, 'hello bulletinboard test')
})

module.exports = router
