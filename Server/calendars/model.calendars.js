const Sequelize = require('sequelize')
const sequelize = require('../config/database')
let Houses = require('../houses/model.houses.js')
let chalk = require('chalk')

const Calendars = sequelize.define('calendars',{
	calendar_google_id:{
		type: Sequelize.STRING(50),
		allowNull: false
	}
})

Calendars.belongsTo(Houses)

Calendars.sync().then(function () {
  // Table created
	console.log(chalk.yellow('+++line32 model.calendars table successfully created'))
}).catch(function(err){
	console.error(chalk.red('There was an error in model.calendars'), err)
})

module.exports = {Calendars}
