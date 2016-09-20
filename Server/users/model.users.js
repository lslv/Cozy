//requiring necessary modules and files for table creation
const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Houses = require('../houses/model.houses.js')

const Users = sequelize.define('users',{
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
  admin:{
    type: Sequelize.BOOLEAN
  },
  email: {
    type: Sequelize.STRING(80),
    unique: true,
    notNull: true,
    isEmail: true
  },
  password: {
    type: Sequelize.STRING,
    notNull: true
  },
  pay_percentage:{
    type: Sequelize.DECIMAL,
    notNull: true,
    isDecimal: true
  },
  house_id:{
    type: Sequelize.INTEGER,
    references: {
      model: Houses,
      key: 'id'
    }
  }
},
//Ensure timeStamps are true
{
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true
})

Users.sync()

module.exports = Users
