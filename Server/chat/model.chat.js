const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Users = require('../users/model.users')
const chalk = require('chalk')

const Rooms = sequelize.define('Rooms', {
	room_name: {
		type: Sequelize.STRING(20),
		notNUll: true
	}




}, {
	timestamps: false,
	underscored: true
})

const ChatRooms = sequelize.define('chatRooms', {
	role: Sequelize.STRING
}, {
	timestamps: false,
	underscored: true
})

Rooms.belongsToMany(Users, { through: ChatRooms })
Users.belongsToMany(Rooms, { through: ChatRooms })

Rooms.sync().then(function () {
  console.log(chalk.green('+++line26 model.rooms table successfully created'))
}).catch(function (err) {
  console.error('There was an error in model.users', err)
})


ChatRooms.sync().then(function () {
  console.log(chalk.green('+++line34 model.ChatRooms table successfully created'))
}).catch(function (err) {
  console.error('There was an error in model.users', err)
})

// //Uncomment to drop tables
// ChatRooms.sync({force:true})
// Rooms.sync({force:true})