// requiring necessary modules and files for table creation
const Sequelize = require('sequelize')
const sequelize = require('../config/database')
let Houses = require('../houses/model.houses.js')
let chalk = require('chalk')
//let User_Ratings = require('../ratings/model.ratings.js')

const Users = sequelize.define('users', {
	user_name: {
		type: Sequelize.STRING(50),
		unique: true,
		notNull: true
	},
	first_name: {
		type: Sequelize.STRING(60),
		notNull: true
	},
	last_name: {
		type: Sequelize.STRING(60),
		notNull: false
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
		notNull: true
	},
	pay_percentage: {
		type: Sequelize.DECIMAL,
		notNull: true,
		isDecimal: true
	} // ,
// house_id:{
//   type: Sequelize.INTEGER,
//   references: {
//     model: Houses,
//     key: 'id'
//   }
// }
} ,
	{
		timestamps: true,
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
    // deletedAt: 'deleted_at',
		underscored: true,
		paranoid: true
	}
)

Slush_Fund_Payments.belongsTo(Houses, {
  as: 'house_id',
  foreignKey: 'houses'
})

Users.belongsTo(Houses)

// Users.belongsTo(User_Ratings, {
//	as: 'reviews',
//	foreignKey: 'user_ratings'
//})

Users.sync().then(function () {
  // Table created
	console.log(chalk.white('+++line72 model.users table successfully created'))
}).catch(function (err) {
	console.error(chalk.white('+++line74 There was an error in model.users'), err)
})

module.exports = Users
