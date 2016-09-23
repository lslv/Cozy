const express = require('express')
const chalk = require('chalk')
const database = require('./config/database.js')
const routesMain = require('./routes.main.js')
const app = express()
// Requiring Tables Here:
let House = require('./houses/model.houses.js')
let User = require('./users/model.users.js')
let Post_Tables = require('./bulletinBoard/model.posts.js')
let Poll_Tables = require('./bulletinBoard/model.polls.js')
let Chore_Tables = require('./chores/model.chores.js')

app.use('/', routesMain)

const port = process.env.PORT || 1337

app.listen(port, () => {
  console.log(chalk.cyan(`<Cozy> is listening on ${port}`))
})
