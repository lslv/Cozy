const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Users = require('../users/model.users')
const chalk = require('chalk')

const Room_Names = sequelize.define('Room_Names', {
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

Room_Names.belongsToMany(Users, { through: ChatRooms })
Users.belongsToMany(Room_Names, { through: ChatRooms })

Room_Names.sync().then(function () {
  console.log(chalk.green('+++line26 model.rooms table successfully created'))
}).catch(function (err) {
  console.error('There was an error in model.users', err)
})


ChatRooms.sync().then(function () {
  console.log(chalk.green('+++line34 model.ChatRooms table successfully created'))
}).catch(function (err) {
  console.error('There was an error in model.users', err)
})

//Uncomment to drop tables
// ChatRooms.sync({force:true})
// Room_Names.sync({force:true})

module.exports = { Room_Names: Room_Names, ChatRooms: ChatRooms }
