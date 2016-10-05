const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const chalk = require('chalk')
const database = require('./config/database.js')
const routesMain = require('./routes.main.js')
const passport = require('passport')
const Strategy = require('passport-facebook').Strategy
const port = process.env.PORT || 1337
const fb_auth = require('./users/auth')

//Sockets for chat
require('./chat/index')(io)

//FB auth
require('./users/controller.fb_auth')(passport, Strategy, app, port)


app.use('/', routesMain)


server.listen(port, () => {
	console.log(chalk.cyan(`<Cozy> is listening on ${port}`))
})

