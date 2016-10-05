// requiring necessary modules and files for table creation
const Sequelize = require('sequelize')
const sequelize = require('../config/database')
let Houses = require('../houses/model.houses.js')
let chalk = require('chalk')
// let User_Ratings = require('../ratings/model.ratings.js')

const Users = sequelize.define('users', {
	fb_id: {
		type: Sequelize.BIGINT
	},
	user_name: {
		type: Sequelize.STRING(50),
		unique: true,
		notNull: true
	},
	first_name: {
		type: Sequelize.STRING(60),
	},
	last_name: {
		type: Sequelize.STRING(60),
	},
	admin: {
		type: Sequelize.BOOLEAN
	},
	email: {
		type: Sequelize.STRING(80),
    // unique: true,
		notNull: true,
		isEmail: true
	},
	password: {
		type: Sequelize.STRING,
	},
	pay_percentage: {
		type: Sequelize.DECIMAL,
		isDecimal: true
	},
	fb_picture: {
		type: Sequelize.STRING
	}
} ,
	{
		timestamps: true,
		underscored: true
		// paranoid: true
	}
)

Users.belongsTo(Houses)

Users.sync()
	// .then(function () {
	//   // Table created
	// 	console.log(chalk.white('+++line72 model.users table successfully created'))
	// })
	// .catch(function (err) {
	// 	console.error(chalk.white('+++line74 There was an error in model.users'), err)
	// })

console.log(chalk.cyan('+++line 57 this is users table in users model: ', Users))

module.exports = Users
