const express = require('express')
const chalk = require('chalk')
const database = require('./config/database.js')
const routesMain = require('./routes.main.js')
const app = express()
//Requiring Tables Here:
const House = require('./houses/model.houses.js')
const User = require('./users/model.users.js')
const Post_Tables = require('./bulletinBoard/model.posts.js')

app.use('/', routesMain)

const port = process.env.PORT || 1337

app.listen(port, ()=>{
  console.log(chalk.cyan(`<Cozy> is listening on ${port}`))
})
