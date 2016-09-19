const express = require('express')

const app = express()

app.use('/', express.static('Public'))


const port = 1337

app.listen(port, ()=>{
  console.log(`app is listing on ${port}`)
})
