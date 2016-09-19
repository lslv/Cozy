const express = require('express')
const app = express()

//loggs route to console
app.get('/*', (req, res, next)=>{
  console.log(`Request.Url: ${req.url}`)
  next()
})

app.use('/', express.static('public'))

const port = process.env.PORT || 1337

app.listen(port, ()=>{
  console.log(`app is listing on ${port}`)
})
