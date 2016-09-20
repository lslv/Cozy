//requiring necessary modules and files for table creation
const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const House = require('../houses/model.houses.js')

const Users = sequelize.define('users',{
  user_name: {
    type:Sequelize.STRING(50),
    unique: true,
    allowNull:false
  },
  first_name: {
    type: Sequelize.STRING(60),
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING(60),
    allowNull: false
  },
  admin:{
    type: Sequelize.BOOLEAN
  },
  email: {
    type: Sequelize.STRING(80),
    unique: true,
    notNull: true,
    isEmail: true
  },
})

sequelize.sync()

module.exports = Users
