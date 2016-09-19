const express = require('express')
const routesMain = require('./routes.main.js')
const app = express()

app.use('/', routesMain)

const port = process.env.PORT || 1337

app.listen(port, ()=>{
  console.log(`app is listing on ${port}`)
})
