const express = require('express')
const chalk = require('chalk')

const routesMain = require('./routes.main.js')
const app = express()

app.use('/', routesMain)

const port = process.env.PORT || 1337

app.listen(port, ()=>{
  console.log(chalk.cyan(`<Cozy> is listening on ${port}`))
})
