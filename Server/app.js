const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const chalk = require('chalk')
const database = require('./config/database.js')
const routesMain = require('./routes.main.js')
require('./chat/index')(io)
// const app = express()
// Requiring Tables Here:
let House = require('./houses/model.houses.js')
let User = require('./users/model.users.js')
let Post_Tables = require('./bulletinBoard/model.posts.js')
let Poll_Tables = require('./bulletinBoard/model.polls.js')
let Chore_Tables = require('./chores/model.chores.js')
let Bill_Tables = require('./billing/model.billing.js')
let Rating_Tables = require('./ratings/model.ratings.js')
let Calendars = require('./calendars/model.calendars.js')

app.use('/', routesMain)

const port = process.env.PORT || 1337

server.listen(port, () => {
	console.log(chalk.cyan(`<Cozy> is listening on ${port}`))
})

