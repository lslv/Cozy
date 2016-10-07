const Sequelize = require('sequelize')
const sequelize = require('../config/database')
let Houses = require('../houses/model.houses.js')
let Users = require('../users/model.users.js')
let chalk = require('chalk')

// This is the table for Posts and comments on posts

const Posts = sequelize.define('posts', {
	title: {
		type: Sequelize.STRING(50),
		notNull: true
	},
	message: {
		type: Sequelize.STRING
	}
},
	{
		timestamps: true,
		underscored: true
	})

Posts.belongsTo(Houses
// ,{
// as: 'house_id',
// foreignKey: 'Houses'
// }
)
Posts.belongsTo(Users
//   ,{
//   as: 'user_id',
//   foreignKey: 'Users'
// }
)

// Posts.hasOne(Posts,{
//   as:'parent_post'
// })
// Posts.hasMany(Posts, {as:child_post})

// This is the table for votes on posts

const Post_Votes = sequelize.define('post_votes', {
  // Vote_value consists of 0's (a down vote) and 1's (an up vote)
	vote_value: {
		type: Sequelize.INTEGER
	}
})

Post_Votes.belongsTo(Users,
	{
		as: 'user_id',
		foreignKey: 'Users'
	})

Post_Votes.belongsTo(Posts,
	{
		as: 'post_id',
		foreignKey: 'Posts'
	})

Posts.sync().then(function () {
  // Table created
  console.log(chalk.green('+++line43 model.posts table successfully created'))
}).catch(function (err) {
  console.error('There was an error in model.users', err)
})

Post_Votes.sync().then(function () {
  // Table created
	console.log(chalk.white('+++line79 model.post_Votes table successfully created'))
}).catch(function (err) {
	console.error('There was an error in model.users', err)
})

//Uncomment to drop tables
// Posts.sync({force:true})
// Post_Votes.sync({force:true})


module.exports = {Posts: Posts, Post_Votes: Post_Votes}
