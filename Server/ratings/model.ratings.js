const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Users = require('../users/model.users')
const chalk = require('chalk')

console.log('=====')
console.log('=====')
console.log('=====')
console.log('=====')
console.log(Users)
console.log('=====')
console.log('=====')
console.log('=====')
console.log('======')

const User_Ratings = sequelize.define('user_ratings',{
	star: {
		type: Sequelize.INTEGER
	},
	review: {
		type: Sequelize.TEXT,
		notNull: true
	}
	// reviewer_user_name: {
	// 	type: Sequelize.STRING(50),
	// 	references: {
	// 		model: Users,
	// 		key: 'user_name'
	// 	}
	// }
},{
	timestamps: true,
	underscore: true,
	deletedAt: false
})

// User_Ratings(belongs)


User_Ratings.sync().then(function () {
	console.log(chalk.cyan('+++line33 model.user_ratings table successfully created'))
}).catch(function (err) {
	console.error(chalk.cyan('+++line35 There was an error in model.user_ratings'), err)
})


const User_Ratings_Join_Table = sequelize.define('user_ratings_join_table')

console.log(chalk.cyan('+++line 38 this is the user_ratings table: ', User_Ratings))
console.log(chalk.cyan('+++line 39 this is the users table: ', Users))


User_Ratings.belongsToMany(Users, {through: User_Ratings_Join_Table})
Users.belongsToMany(User_Ratings, {through: User_Ratings_Join_Table})

module.exports = {User_Ratings: User_Ratings, User_Ratings_Join_Table: User_Ratings_Join_Table}
