const Sequelize = require('sequelize')
const sequelize = require('../config/database')
let Users = require('../users/model.users.js')
let chalk = require('chalk')

const User_Ratings = sequelize.define('user_ratings',{
  star: {
    type: Sequelize.INTEGER,
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

User_Ratings.belongsTo(Users,{
  as:'reviewer_user_id',
  foreignKey: 'users'
})

// User_Ratings.sync().then(function () {
// 	console.log(chalk.cyan('+++line72 model.user_ratings table successfully created'))
// }).catch(function (err) {
// 	console.error(chalk.cyan('+++line74 There was an error in model.user_ratings'), err)
// })

module.exports = {User_Ratings: User_Ratings}
