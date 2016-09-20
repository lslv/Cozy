const express = require('express')
const chalk = require('chalk')
const database = require('./config/database.js')
const routesMain = require('./routes.main.js')
const app = express()
const House = require('./houses/model.houses.js')
const User = require('./users/model.users.js')

app.use('/', routesMain)

const port = process.env.PORT || 1337

app.listen(port, ()=>{
  console.log(chalk.cyan(`<Cozy> is listening on ${port}`))
})
