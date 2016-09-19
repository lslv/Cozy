const express = require('express')
const router = express.Router()

router.get('/test', (req, res)=>{
  res.send(200, 'hello chores test')
})

module.exports = router
