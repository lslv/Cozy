const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Users = require('../users/model.users')
const chalk = require('chalk')

// This is the User_Ratings Table:

const User_Ratings = sequelize.define('user_ratings',{
	reviewed_by: {
		type: Sequelize.INTEGER,
		notNull: true
	},
	star: {
		type: Sequelize.INTEGER,
		notNull: true
	},
	review: {
		type: Sequelize.TEXT,
		notNull: true
	}
},{
	timestamps: true,
	underscore: true,
	deletedAt: false
})


User_Ratings.sync().then(function () {
	console.log(chalk.white('+++line33 model.user_ratings table successfully created'))
}).catch(function (err) {
	console.error(chalk.white('+++line35 There was an error in model.user_ratings'), err)
})

// This is the User_Ratings_Join_Table that will depend an instance of review

const User_Ratings_Join_Table = sequelize.define('user_ratings_join_table')

User_Ratings.belongsToMany(Users, {through: User_Ratings_Join_Table})
Users.belongsToMany(User_Ratings, {through: User_Ratings_Join_Table})

module.exports = {User_Ratings: User_Ratings, User_Ratings_Join_Table: User_Ratings_Join_Table}
