const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Houses = require('../houses/model.houses.js')
const Users = require('../users/mode.users.js')


//This is the table for Posts and comments on posts

const Posts = sequelize.define('posts',{
  title:{
    type: Sequelize.STRING(50),
    notNull: true
  },
  description:{
    type: Sequelize.STRING
  },
  expired_at:{
    type: Sequelize.DATE
  }
},
{
  timestamps: true,
  underscored: true,
  paranoid: true
})

Posts.belongsTo(Houses,{
  as: 'house_id',
  foreignKey: 'Houses'
})
Posts.belongsTo(Users,{
  as: 'user_id',
  foreignKey: 'Users'
})

Posts.hasOne(Posts,{
  as:parent_post
})
// Posts.hasMany(Posts, {as:child_post})

Posts.sync({force: true}).then(function () {
  // Table created
  console.log('+++line43 model.posts table successfully created')
}).catch(function(err){
  console.error('There was an error in model.users', err)
})



// This is the table for votes on posts

const Post_Votes = sequelize.define('post_votes',{
  //Vote_value consists of 0's (a down vote) and 1's (an up vote)
  vote_value:{
    type: Sequelize.INTEGER
  }
})

Post_Votes.belongsTo(Users,{
  as: 'user_id',
  foreignKey: 'Users'
})
Post_Votes.belongsTo(Posts,{
  as: 'post_id',
  foreignKey: 'Posts'
})

Post_Votes.sync({force: true}).then(function () {
  // Table created
  console.log('+++line70 model.post_Votes table successfully created')
}).catch(function(err){
  console.error('There was an error in model.users', err)
})

//? How do I export tables properly?
module.exports = Posts
module.exports = Post_Votes
